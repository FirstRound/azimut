'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
// import minifycss from 'gulp-minify-css';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import reload from 'gulp-livereload';
import connect from 'gulp-connect';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
//ES6
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';



gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(sourcemaps.write('build/maps'))
	.pipe(rename({suffix: '.min'}))
	.pipe(connect.reload())
	.pipe(notify({
		message: 'sass!'
	}))
	.pipe(gulp.dest('css'));
});
//server
gulp.task('server', function() {
	connect.server({
		root: '',
		livereload: true
	});
});
//html
gulp.task('html', function () {
	gulp.src('*.html')
	.pipe(connect.reload())
	.pipe(notify({
		message: 'html!'
	}));
});

//watcher
gulp.task('watch', function () {
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['build/js/my/*.js'], ['ES6']);
	gulp.watch(['scss/*.scss'], ['sass']);
	gulp.watch(['scss/*/*.scss'], ['sass']);
	gulp.watch(['scss/*/*/*.scss'], ['sass']);
	gulp.watch(['build/img/*'], ['img']);
});

gulp.task('default', ['server', 'watch']);



