#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var jsonRefs = require('json-refs');
var yaml = require('js-yaml');

var program = require('commander');

program
  .usage('<file>')
  .parse(process.argv);

var file = program.args[0];

if (!fs.existsSync(file)) {
  console.error('File does not exist. (' + file + ')');
  process.exit(1);
}

var absolutePath = path.resolve(file);

var options = {
  filter: ['relative', 'remote'],
  loaderOptions: {
    processContent: function (res, callback) {
      callback(undefined, yaml.safeLoad(res.text));
    }
  }
};

jsonRefs.resolveRefsAt(absolutePath, options)
.then(function (results) {
  var errors = [];

  Object.keys(results.refs).sort().forEach(function (refPtr) {
    var refDetails = results.refs[refPtr];

    // We ignore validation on local refs.
    if (refDetails.def.$ref.startsWith('#')) {
      return;
    }
    if (refDetails.type === 'invalid' || refDetails.error) {
      errors.push(refPtr + ': ' + refDetails.error)
    }
  });

  if (errors.length > 0) {
    throw new Error('Document has invalid references:\n\n' + errors.join('\n'));
  }
  console.log(yaml.safeDump(results.resolved))
})
.catch(function (error) {
  console.error('error: ' + error.message)
  process.exit(1);
});

