var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var webserver = require('gulp-webserver');

gulp.task('swebserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      host: '0.0.0.0',
      port: 8080
    }));
});

var server = require('gulp-server-livereload');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true,
      host: '0.0.0.0',
      port: 8080
    }));
});

gulp.task('styles', function() {
    return gulp.src('./sass/*.scss')
          .pipe(sass(
            {
              outputStyle: 'compressed'
            }
          ).on('error', sass.logError))
          .pipe(gulp.dest('./dist/css'))
});

gulp.task('html', function() {
      return gulp.src('./templates/*.html')
         .pipe(gulp.dest('./dist/'))
})

gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['styles']);
    gulp.watch('./templates/*.html', ['html']);
});

gulp.task('default', ['styles','html','watch'], function() {
  // Do stuff
  gulp.start(['webserver']);
  return gulp.dest('dist');
});
