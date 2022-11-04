import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parser.js';
import stylish from './stylish.js';

const readFile = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
};

const getFileFormat = (filename) => path.extname(filename).slice(1);

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: 'deleted', key, value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { type: 'inserted', key, children: buildDiff(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return {
        type: 'changed', key, value1: data1[key], value2: data2[key],
      };
    }
    return { type: 'unchanged', key, value: data1[key] };
  });
};

const gendiff = (filepath1, filepath2) => {
  const file1Format = getFileFormat(filepath1);
  const file2Format = getFileFormat(filepath2);
  const data1 = parse(readFile(filepath1), file1Format);
  const data2 = parse(readFile(filepath2), file2Format);
  const diffTree = buildDiff(data1, data2);
  return stylish(diffTree);
};

export default gendiff;
