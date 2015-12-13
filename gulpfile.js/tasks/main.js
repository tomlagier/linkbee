// ==== MAIN ==== //

var gulp = require('gulp')
    , runSequence = require('run-sequence');

isProd = true;

gulp.task('setDev', function(){
  isProd = false;
});

// Default task chain: build -> (livereload or browsersync) -> watch
gulp.task('dev', function(){
  runSequence('setDev', 'watch');
});

// One-off setup tasks
gulp.task('setup', ['utils-normalize']);

// Build a working copy of the theme
gulp.task('build', ['images', 'scripts', 'styles', 'theme']);

// Dist task chain: wipe -> build -> clean -> copy -> images/styles
// NOTE: this is a resource-intensive task!
gulp.task('dist', ['images-dist', 'styles-dist']);
