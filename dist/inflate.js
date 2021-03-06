'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


// eslint-disable-next-line complexity
const inflate = (node, index, path) => {
  if (node && node.id && node.__typename) {
    const route = path.join(',');

    if (index[route] && index[route][node.__typename] && index[route][node.__typename][node.id]) {
      return index[route][node.__typename][node.id];
    }

    if (!index[route]) {
      index[route] = {};
    }

    if (!index[route][node.__typename]) {
      index[route][node.__typename] = {};
    }

    index[route][node.__typename][node.id] = node;
  }

  let result = {};
  let fieldNames = Object.keys(node);
  if (Array.isArray(node)) {
    result = [];
    fieldNames = Array.from({ length: node.length }, (el, i) => i);
  }

  for (const fieldName of fieldNames) {
    const value = node[fieldName];

    if (Array.isArray(value)) {
      result[fieldName] = value.map(childNode => {
        if (typeof childNode === 'object' && childNode !== null || Array.isArray(childNode)) {
          return inflate(childNode, index, path.concat([fieldName]));
        }

        return childNode;
      });
    } else if (typeof value === 'object' && value !== null) {
      result[fieldName] = inflate(value, index, path.concat([fieldName]));
    } else {
      result[fieldName] = value;
    }
  }

  return result;
};

exports.default = response => {
  const index = {};

  return inflate(response, index, []);
};
//# sourceMappingURL=inflate.js.map