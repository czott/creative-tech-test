var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');

// Requires browser sync
var browserSync = require('browser-sync').create();

gulp.task( 'default', [ 'watch' ] )

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

gulp.task('sass', function() {
  return gulp.src('src/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('copyHtml', function() {
  return gulp.src('src//*.html')
  .pipe(gulp.dest('dist/'))
});

gulp.task('copyImg', function() {
  return gulp.src('src/assets/images/*')
  .pipe(gulp.dest('dist/assets/images'))
});

// Files to watch
gulp.task('watch', ['browserSync', 'sass'], function(){
	//scss
	gulp.watch('src/assets/scss/**/*.scss', ['sass']);
	
	//html
	gulp.watch('src/*.html', ['copyHtml', browserSync.reload]); 
  	
	//js
  gulp.watch('src/assets/js/**/*.js', browserSync.reload); 

  //img
  gulp.watch('src/assets/images/*', ['copyImg', browserSync.reload]); 
})