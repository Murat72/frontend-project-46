#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import gendiff from '../src/index.js';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('output the version number')
  .option('-f --format <type>', 'output format (default: "stylish")', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, opts) => {
    console.log(gendiff(filepath1, filepath2, opts.format));
  });

program.parse();