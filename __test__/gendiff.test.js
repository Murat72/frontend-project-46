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

test('fromat Stylish from JSON', () => {
  const firstFile = getFixturePath('file1.json');
  const secondFile = getFixturePath('file2.json');
  expect(gendiff(firstFile, secondFile)).toBe(expectedStylish);
});

test('format Stylish from YAML', () => {
  const firstFile = getFixturePath('file1.yaml');
  const secondFile = getFixturePath('file2.yml');
  expect(gendiff(firstFile, secondFile)).toBe(expectedStylish);
});

test('format Plain from JSON', () => {
  const firstFile = getFixturePath('file1.json');
  const secondFile = getFixturePath('file2.json');
  expect(gendiff(firstFile, secondFile, 'plain')).toBe(expectedPlain);
});

test('format Plain from YAML', () => {
  const firstFile = getFixturePath('file1.yaml');
  const secondFile = getFixturePath('file2.yml');
  expect(gendiff(firstFile, secondFile, 'plain')).toBe(expectedPlain);
});

test('format Json from JSON', () => {
  const firstFile = getFixturePath('file1.json');
  const secondFile = getFixturePath('file2.json');
  expect(gendiff(firstFile, secondFile, 'plain')).toBe(expectedJson);
});

test('format Json from YAML', () => {
  const firstFile = getFixturePath('file1.yaml');
  const secondFile = getFixturePath('file2.yml');
  expect(gendiff(firstFile, secondFile, 'plain')).toBe(expectedJson);
});