import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish: stylish,
  plain: plain
}

const format = (tree, formatName) => {
  return formatters[formatName](tree);
}

export default format;