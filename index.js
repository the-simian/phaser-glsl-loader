'use strict';

var _ = require('lodash');

/** gl-loader */
function toCleanStrings(line) {
  return _.trim(line);
}

function emptyStuff(line) {
  if (line) {
    return line;
  }
}

function toStrings(line) {
  return '"' + line + '"';
}

function glFragmentLoader(source) {
  this.cacheable && this.cacheable();
  
  var sourceArray = source.split('\n');
  
  var cleanData = _(sourceArray)
    .map(toCleanStrings)
    .filter(emptyStuff)
    .map(toStrings)
    .value();
  
  return 'module.exports=[' + cleanData + '];';
}

module.exports = glFragmentLoader;