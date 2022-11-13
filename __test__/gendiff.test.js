import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJson = readFile('expectedJson.txt');

const extensions = ['json', 'yml'];

test.each([
  extensions
])('test gendfiff', (extension) => {
  const fileBefore = getFixturePath(`file1.${extension}`);
  const fileAfter = getFixturePath(`file2.${extension}`);

  expect(gendiff(fileBefore, fileAfter)).toBe(expectedStylish);
  expect(gendiff(fileBefore, fileAfter)).toBe(expectedStylish);
  expect(gendiff(fileBefore, fileAfter, 'plain')).toBe(expectedPlain);
  expect(gendiff(fileBefore, fileAfter, 'plain')).toBe(expectedPlain);
  expect(gendiff(fileBefore, fileAfter, 'json')).toBe(expectedJson);
  expect(gendiff(fileBefore, fileAfter, 'json')).toBe(expectedJson);
});
