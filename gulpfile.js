var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var image = require('gulp-imagemin');
var vulcanize = require('gulp-vulcanize');
var sass = require('gulp-sass')

// watch files for changes and reload
gulp.task('serve', function(){
    browserSync({
        server: {
            baseDir: 'www'
        }
    });
    gulp.watch(['*.html', '**/*.html', 'js/*.js', 'css/*.css', 'www/css/*.css'], {cwd: '.'}, browserSync.reload);
});

// compress js
gulp.task('minify-js', function(){
    return gulp.src('www/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
// compress css
gulp.task('minify-css', function(){
    return gulp.src('www/css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});
// compress image
gulp.task('image', function(){
    gulp.src('www/img/*')
       .pipe(image())
       .pipe(gulp.dest('dist/img'));
});
// compress image
gulp.task('image', function(){
    gulp.src('www/img/media/*')
       .pipe(image())
       .pipe(gulp.dest('dist/img/media'));
});
// sass compile
gulp.task('sass', function () {
  return gulp.src('./www/vendor/materialize/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./www/vendor/materialize/sass/**/*.scss', ['sass']);
});
// compress 'minify' the polymer ;)
gulp.task('vulcanize', function(){
    return gulp.src('www/index.html')
        .pipe(vulcanize({
            stripComments: true,
            inlineCss: true
        }))
        .pipe(gulp.dest('dist'));
});

// copy polymer elements required
gulp.src(['www/fonts/**/*']).pipe(gulp.dest('./dist/fonts'));
gulp.src(['www/elements/**/*']).pipe(gulp.dest('./dist/elements'));
gulp.src(['www/pages/**/*']).pipe(gulp.dest('./dist/pages'));
gulp.src(['www/templates/**/*']).pipe(gulp.dest('./dist/templates'));
gulp.src(['www/vendor/**/*']).pipe(gulp.dest('./dist/vendor'));
gulp.src(['www/css/font-awesome/**/*']).pipe(gulp.dest('./dist/css/font-awesome'));

// distribution task
gulp.task('dist', ['minify-css', 'image', 'minify-js', 'vulcanize']);
