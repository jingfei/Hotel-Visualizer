var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jsonTransform = require('gulp-json-transform');

var minifyHTML = require('gulp-minify-html');


var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};


gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src('./view/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./public/'));
});

gulp.task('scripts', function() {
  gulp.src(['./js/**/*.js'])
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write())
  .pipe(uglify())
  .pipe(gulp.dest('./public/js/'));
});

gulp.task('json', function() {
	gulp.src(['./js/**/*.json'])
	.pipe(jsonTransform(function(data) {
		return data;
	}))
	.pipe(gulp.dest('./public/js/'));
});

gulp.task('scss', function() {
  return gulp.src(['./scss/**/*.scss', './scss/**/*.css'])
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers:  AUTOPREFIXER_BROWSERS,
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function () {
  gulp.watch(['./js/**/*.js'], ['scripts']);
  gulp.watch(['./js/**/*.json'], ['json']);
  gulp.watch(['./scss/**/*.scss', './scss/**/*.css'], ['scss']);
  gulp.watch(['./images/**/*.jpg', './images/**/*.png', './images/**/*.gif'], ['image'])
});

gulp.task('image', function () {
  return gulp.src(['./images/**/*.jpg', './images/**/*.png', './images/**/*.gif'])
  .pipe(gulp.dest('./public/images/'));
});

gulp.task('font', function () {
  return gulp.src(['./font/**/*'])
  .pipe(gulp.dest('./public/font/'));
})


gulp.task('default', ['scripts', 'json', 'scss', 'image', 'font', 'watch']);
