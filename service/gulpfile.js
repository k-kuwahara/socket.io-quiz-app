"use strict";

var gulp     = require('gulp'),
    sass     = require('gulp-sass'),
    eslint   = require('gulp-eslint'),
    plumber  = require('gulp-plumber'),
    notifier = require('node-notifier'),
    cached   = require('gulp-cached'),
    uglify   = require('gulp-uglify'),
    rename   = require('gulp-rename'),
    jade     = require('gulp-jade');

var paths = {
  'js'      : './js/*.js',
  'css'     : './css/**/*.css',
  'scss'    : './scss/**/*.scss',
  'scss_dir': './scss/',
  'css_dir' : './css/',
  'jade'    : './jade/**/*.jade'
}

var excluded = {
   'jquery':   '!./js/jquery*.js',
   'bootstrap':'!./js/bootstrap*.js',
   'bootstrap_sub':'!./js/bootstrap/*.js'
}


// 共通エラーハンドラー
var error_handler = {
   // タスクネーム
   task: '',
   // エラーをハンドル
   errorHandler: function(error) {
      var title     = '[task]' + this.task + ' ' + error.plugin;
      var error_msg = 'error: ' + error.message;
      // コンソールにエラーを出力
      console.error(title + '\n' + error_msg);
      // エラーを通知
      notifier.notify({
        title  : title,
        message: error_msg,
        time: 3000
      });
   }
};

// eslint タスク
gulp.task('lint', function() {
   error_handler.task = 'lint';
   return gulp.src([
         paths.js,
         excluded.bootstrap,
         excluded.bootstrap_sub
      ])
      .pipe(plumber(error_handler))
      .pipe(eslint( { useEslintrc: false } ))
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(plumber.stop());
});

// scss タスク
gulp.task('scss', function() {
   error_handler.task = 'scss';
   return gulp.src(paths.scss)
      .pipe(plumber(error_handler))
      .pipe(cached('sassfiles'))
      .pipe(sass({ outputStyle: 'extended' }))
      .pipe(gulp.dest(paths.css_dir))
      .pipe(plumber.stop());
});

// jade タスク
gulp.task('jade', function() {
   error_handler.task = 'jade';
   return gulp.src(paths.jade)
      .pipe(plumber(error_handler))
      .pipe(jade({ pretty: true }))
      .pipe(gulp.dest('html'))
      .pipe(plumber.stop());
});

// min タスク(css)
gulp.task('cssmin', function() {
   return gulp.src(paths.css)
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('css/min/'));
});

// min タスク(js)
gulp.task('jsmin', function() {
   return gulp.src(paths.js)
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('js/min'));
});

// watch タスク
gulp.task('watch', function() {
    gulp.watch(paths.js, function() {
        gulp.run('lint');
    });

   gulp.watch(paths.scss, function() {
      gulp.run('scss');
   });

   gulp.watch(paths.jade, function() {
      gulp.run('jade');
   });
});

// derfault タスク
gulp.task('default', ['watch']);
