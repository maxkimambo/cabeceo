'use strict';


var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'server/*/*.js', 'tests/*/*.js'];

gulp.task('jsstyle', function(){
   return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs());
});

gulp.task('serve', ['jsstyle'], function(){
    var options = {
      script: 'server/index.js',
      tasks: ['jsstyle'],
      delayTime: 3,
      env: {
        'PORT': 9000
      },
      watch : jsFiles
    }
    return nodemon(options)
          .on('restart', function(ev){
              console.log('test'); 
          });
});
