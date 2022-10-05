import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parser.js';

const readFile = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
};

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
      return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, 1);
};

const getFileFormat = (filename) => path.extname(filename).slice(1);

const gendiff = (filepath1, filepath2) => {
  const file1Format = getFileFormat(filepath1);
  const file2Format = getFileFormat(filepath2);
  const obj1 = parse(readFile(filepath1), file1Format);
  const obj2 = parse(readFile(filepath2), file2Format);
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortKeys = _.sortBy(keys);
  const res = sortKeys
    .reduce((acc, key) => {
      if (!_.has(obj1, key)) {
        acc[`+ ${key}`] = obj2[key];
      } else if (!_.has(obj2, key)) {
        acc[`- ${key}`] = obj1[key];
      } else if (obj1[key] !== obj2[key]) {
        acc[`- ${key}`] = obj1[key];
        acc[`+ ${key}`] = obj2[key];
      } else {
        acc[`  ${key}`] = obj1[key];
      }
      return acc;
    },{});
  return stringify(res);
};

export default gendiff;
