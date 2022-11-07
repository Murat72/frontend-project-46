import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish: stylish,
  plain: plain,
  json: json,
}

const format = (tree, formatName) => {
  return formatters[formatName](tree);
}

export default format;