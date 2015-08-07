'use strict';

var through = require('through2');

var escapes = {
  '\n': '\\n',
  '"': '\\"'
};

var getEscape = function(match) {
  return escapes[match];
};

module.exports = function svgify(file, opts) {

  if (file.split('.').pop() !== 'svg') {
    return through();
  }

  return through(function (chunk, enc, callback) {
    var svg = chunk.toString();
    svg = svg.replace(/(\n|")/g, getEscape);

    var moduleString = 'module.exports = "' + svg + '";';

    callback(null, moduleString);
  });
};
