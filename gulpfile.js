/**
 *  @license
 *    Copyright 2017 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 **/
'use strict';

const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const rename = require('gulp-rename');
const initWcBuild = require('byu-web-component-build').gulp;

gulp.task('build', ['wc:build', 'demo:build'], function () {
  browserSync.reload();
});

initWcBuild(gulp, {
  componentName: 'byu-calendar',
  js: {
    input: './byu-calendar.js',
    polyfillUrl: 'https://cdn.byu.edu/web-component-polyfills/latest/web-component-polyfills.min.js'
  },
  css: {
    input: './byu-calendar.scss'
  }
});

gulp.task('demo:build', function() {
  gulp.src('./demo/**')
        .pipe(gulp.dest('./dist/demo/'));
});

gulp.task('watch', ['build'], function (done) {
  browserSync.init({
    server: {
      baseDir: './',
    },
    startPath: '/dist/demo/',
    notify: false
  }, done);

  gulp.watch(['./demo/**', './byu-calendar/**', './byu-calendar-row/**', './byu-calendar-tile/**', './byu-calendar-feature-column', './byu-calendar-minimal-tile/**'], ['build']);
});

gulp.task('default', ['watch']);


