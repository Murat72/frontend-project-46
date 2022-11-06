import _ from 'lodash';

const getIndent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);
const getBracketsIndent = (depth, spaceCount = 4) => ' '.repeat((depth * spaceCount) - spaceCount);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const lines = Object
    .entries(data)
    .map(([key, val]) => `${getIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${getBracketsIndent(depth)}}`,
    ].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const lines = node.map((data) => {
      const {
        type, key, value, value1, value2, children,
      } = data;

      switch (type) {
        case 'inserted': {
          return `${getIndent(depth)}  ${key}: ${iter(children, depth + 1)}`;
        }
        case 'added': {
          return `${getIndent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        }
        case 'deleted': {
          return `${getIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        }
        case 'changed': {
          return `${getIndent(depth)}- ${key}: ${stringify(value1, depth + 1)}\n${getIndent(depth)}+ ${key}: ${stringify(value2, depth + 1)}`;
        }
        case 'unchanged': {
          return `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
        }
        default:
          throw new Error(`This type does not exist: ${node.type}`);
      }
    });
    return [
      '{',
      ...lines,
      `${getBracketsIndent(depth)}}`,
    ].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;