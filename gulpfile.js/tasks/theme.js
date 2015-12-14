// ==== THEME ==== //
'use strict';

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../../gulpconfig').theme
  , injectReload = require('gulp-inject-reload');
;

// Copy PHP source files to the `build` folder
gulp.task('theme-php', function() {
  let footerFilter = plugins.filter('*header.php', {restore:true});

  return gulp.src(config.php.src)
  .pipe(plugins.changed(config.php.dest))
  .pipe(footerFilter)
  .pipe(plugins.if(!isProd, injectReload({
        host: 'http://localhost'
    })))
  .pipe(footerFilter.restore)
  .pipe(gulp.dest(config.php.dest))
});

// Copy everything under `src/languages` indiscriminately
gulp.task('theme-lang', function() {
  return gulp.src(config.lang.src)
  .pipe(plugins.changed(config.lang.dest))
  .pipe(gulp.dest(config.lang.dest));
});

// All the theme tasks in one
gulp.task('theme', ['theme-lang', 'theme-php']);
