"use strict";

var gulp     = require('gulp'),
    eslint   = require('gulp-eslint'),
    plumber  = require('gulp-plumber'),
    notifier = require('node-notifier'),
    uglify   = require('gulp-uglify'),
    rename   = require('gulp-rename'),
    jade     = require('gulp-jade');

// 共通plumber処理
var error_handler = function(task) {
   plumber({
      // エラーをハンドル
      errorHandler: function(error) {
         var task_name = task;
         var title     = '[task]' + task_name + ' ' + error.plugin;
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
   });
}

// eslint タスク
gulp.task('lint', function() {
   return gulp.src(['js/*.js'])
      .pipe(error_handler('lint'))
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(plumber.stop());
});

// scss タスク
gulp.task('scss', function() {
   return gulp.src(['scss/*.scss'])
      .pipe(error_handler('scss'))
      .pipe(sass({ outputStyle: 'extended' }))
      .pipe(gulp.dest('css'))
      .pipe(plumber.stop());
});

// jade タスク
gulp.task('jade', function() {
   return gulp.src(['jade/*.jade'])
      .pipe(error_handler('jade'))
      .pipe(jade({ pretty: true }))
      .pipe(gulp.dest('jade'))
      .pipe(plumber.stop());
});

// min タスク(css)
gulp.task('cssmin', function() {
   return gulp.src(['css/*.css'])
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('css/min/'));
});

// min タスク(js)
gulp.task('jsmin', function() {
   return gulp.src(['js/*.js'])
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('js/min'));
});

// watch タスク
gulp.task('watch', function() {
    gulp.watch('js/*.js', function() {
        gulp.run('lint');
    });

   gulp.watch('scss/*.scss', function() {
      gulp.run('scss');
   });

   gulp.watch('jade/*.jade', function() {
      gulp.run('jade');
   });
});

gulp.task('default', ['lint', 'scss', 'jade'], function() {
    gulp.run('watch');
});
