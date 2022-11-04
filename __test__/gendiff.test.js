import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('stylish.txt');

test('genDiffJSON', () => {
  const firstFile = getFixturePath('file1.json');
  const secondFile = getFixturePath('file2.json');
  expect(gendiff(firstFile, secondFile)).toBe(expectedStylish);
});

test('genDiffYAML', () => {
  const firstFile = getFixturePath('file1.yaml');
  const secondFile = getFixturePath('file2.yml');
  expect(gendiff(firstFile, secondFile)).toBe(expectedStylish);
});