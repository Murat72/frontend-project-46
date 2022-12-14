import yaml from 'js-yaml';

const parserFormat = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (file, format) => (
  parserFormat[format](file)
);

export default parse;
