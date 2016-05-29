'use strict';
/* jshint node: true */
/*global require */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

var jsFiles = ['*.js', 'server/*/*.js', 'tests/*/*.js'];
var testFiles = ['tests/*/*.js'];

gulp.task('jsstyle', function(){
   return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs());
});

gulp.task('test', function(){
  return gulp.src(testFiles)
        .pipe(mocha());
});

gulp.task('serve', ['jsstyle', 'test'], function(){
    var options = {
      script: 'server/index.js',
      tasks: ['jsstyle', 'test'],
      delayTime: 3,
      env: {
        'PORT': 9000
      },
      watch : jsFiles
    };
    return nodemon(options)
          .on('restart', function(){

          });
});
