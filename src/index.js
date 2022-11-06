import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parser.js';
import buildDiff from './buildDiff.js';
import format from './formatters/format.js';

const readFile = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
};

const getFileFormat = (filename) => path.extname(filename).slice(1);

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1Format = getFileFormat(filepath1);
  const file2Format = getFileFormat(filepath2);
  const data1 = parse(readFile(filepath1), file1Format);
  const data2 = parse(readFile(filepath2), file2Format);
  const diffTree = buildDiff(data1, data2);
  return format(diffTree, formatName);
};

export default gendiff;
