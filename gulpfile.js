'use strict';

var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var plato = require('gulp-plato');
var runSequence = require('run-sequence');
var coveralls = require('gulp-coveralls');

function test(cb) {

  var mochaOpts = {
    reporter: 'nyan'
  };

  function runner() {
    gulp
      .src(['./test/main.js'])
      .pipe(mocha(mochaOpts))
      .pipe(istanbul.writeReports())

    .on('end', cb);
  }

  gulp
    .src(['./index.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', runner);
}


function complexity() {

  var jsHintArgs = {
      options: {
        strict: true
      }
    },
    complexityArgs = {
      trycatch: true
    },
    platoArgs = {
      jshint: jsHintArgs,
      complexity: complexityArgs
    };


  gulp.src(['index.js'])
    .pipe(plato('plato', platoArgs));
}

function lcov() {
  gulp
    .src('coverage/**/lcov.info')
    .pipe(coveralls());
}


function ci(cb) {
  runSequence('test', 'complexity', cb);
}


gulp
  .task('test', test)
  .task('complexity', complexity)
  .task('coveralls', lcov)
  .task('ci', ci);