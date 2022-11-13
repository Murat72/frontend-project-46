import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const format = (tree, formatName) => (
  formatters[formatName](tree)
);

export default format;
