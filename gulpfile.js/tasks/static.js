'use strict';

let gulp = require('gulp');
let config = require('../../gulpconfig').static;
let debug = require('gulp-debug');

gulp.task('static-build', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.build));
});

gulp.task('static-dist', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dist));
});
