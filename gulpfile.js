const gulp = require('gulp'),
      gutil = require('gulp-util'),
      concat = require('gulp-concat'),
      del = require('del'),
      coffee = require('gulp-coffee'),
      jasmineBrowser = require('gulp-jasmine-browser'),
      watch = require('gulp-watch');

// Clean spec
gulp.task('clean_spec_dir', function() {
  return del(['spec/*']);
});

// Coffee spec
gulp.task('coffee_spec', ['clean_spec_dir'], function() {
  return gulp.src('./spec_coffee/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./spec/'));
});

// Copy JS spec files
gulp.task('copy_js_spec_files', ['coffee_spec'], function() {
  return gulp.src('./spec_coffee/**/*.js')
    .pipe(gulp.dest('./spec/'));
});

// Concat dummy app
gulp.task('concat_dummy_app', ['copy_js_spec_files'], function() {
  const manifest = [
    './spec/dummy/locales/base/**/*.js',
    './spec/dummy/locales/models/**/*.js',
    './spec/dummy/locales/validators/**/*.js',
    './spec/dummy/initializers/**/*.js',
    './spec/dummy/controllers/**/*.js',
    './spec/dummy/models/**/*.js',
    './spec/dummy/views/**/*.js',
    './spec/dummy/templates/**/*.js',
    './spec/dummy/validators/**/*.js'
  ];
  return gulp.src(manifest)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./spec/dummy/'));
});

gulp.task('jasmine', ['concat_dummy_app'], function() {
  const filesForTest = [
    'spec/helpers/**/*.js',
    'spec/loco/**/*.js',
    'dist/loco-model.js',
    'spec/loco.js', // TODO
    'spec/dummy/application.js'
  ];
  return gulp.src(filesForTest)
    .pipe(watch(filesForTest))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});