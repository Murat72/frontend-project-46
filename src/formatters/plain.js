import _ from 'lodash';

const getValueToString = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  if (typeof data === 'string') {
    return `'${data}'`;
  }

  return data;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const lines = node.flatMap((data) => {
      const {
        type, key, value, value1, value2, children,
      } = data;
      switch (type) {
        case 'inserted': {
          return iter(children, `${path}${key}.`);
        }
        case 'added': {
          return `Property '${path}${key}' was added with value: ${getValueToString(value)}`;
        }
        case 'deleted': {
          return `Property '${path}${key}' was removed`;
        }
        case 'changed': {
          return `Property '${path}${key}' was updated. From ${getValueToString(value1)} to ${getValueToString(value2)}`;
        }
        default:
          return [];
      }
    });
    return lines.join('\n');
  };

  return iter(tree, '');
};

export default plain;