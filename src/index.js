import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';

const readFile = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
};

const parsesFile = (file) => JSON.parse(file);

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

const gendiff = (filepath1, filepath2) => {
  const obj1 = parsesFile(readFile(filepath1));
  const obj2 = parsesFile(readFile(filepath2));
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortKeys = _.sortBy(keys);
  const res = sortKeys
    .reduce((acc, key) => {
      if (!Object.hasOwn(obj1, key)) {
        acc[`+ ${key}`] = obj2[key];
      } else if (!Object.hasOwn(obj2, key)) {
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
