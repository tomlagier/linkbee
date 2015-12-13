// ==== SCRIPTS ==== //
'use strict';

let gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , browserify = require('browserify')
  , watchify = require('watchify')
  , envify = require('envify')
  , uglifyify = require('uglifyify')
  , babelify = require('babelify')
  , config      = require('../../gulpconfig').scripts
  , gutil = require('gulp-util')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , path = require('path')
  ;

// Check core scripts for errors
gulp.task('scripts-lint', function() {
  return gulp.src(config.lint.src)
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format());
});

gulp.task('scripts-bundle', ['scripts-lint'], function(done) {
  let bundler = browserify({
    cache: {}, packageCache: {}, fullPaths: false,
    entries: config.entries,
    debug: !isProd,
    detectGlobals: true,
    sourceType: 'module'
  });

  if (!isProd) {
    bundler = watchify(bundler);
  }

  let bundle = entry => {
    bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .on('error', function(error) {
        if (isProd) throw error
      })
      .pipe(source(config.namespace + '-' + path.basename(entry)))
      .pipe(buffer())
      .pipe(plugins.if(!isProd, plugins.sourcemaps.init({loadMaps: !isProd}))) // loads map from browserify file
      .pipe(plugins.if(!isProd, plugins.sourcemaps.write()))
      .pipe(gulp.dest(config.dest))
  }

  let bundleAll = () => {
    config.entries.map(entry => bundle(entry));
    plugins.livereload();
  };

  bundler.transform(babelify.configure({
    ignore: /\.scss$/,
    presets: ['es2015']
  }))

  bundler.transform({
    global: true
  }, 'envify');

  if (isProd) {
    bundler.transform({
      global: true,
      compress: {drop_console: true}
    }, 'uglifyify');
  }

  bundler.add(config.entries);
  bundler.on('update', bundleAll);
  bundler.on('log', gutil.log);

  bundleAll();
  done();
});

// Master script task; lint -> bundle -> minify
gulp.task('scripts', ['scripts-bundle']);
