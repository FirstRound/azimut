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

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var os = require('os');
var gulp = require('gulp');
var open = require('gulp-open');
var copy = require('gulp-copy');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var config =  require('./server/config/environment')
var env = require('gulp-env');
var clean = require('gulp-rimraf');

gulp.task('clean', function () {
    return gulp.src(['!.gitignore','!.git/**/*','dist/*'])
        .pipe(clean());
});

gulp.task('build', ['clean'],function () {
    return gulp.src(['!node_modules/**/*','!dist/**/*','**/*'])
        .pipe(copy("dist"));
})

gulp.task('lint', function () {
    gulp.src(['api/**/*','config/**/*','route.js','app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})

gulp.task('run', function () {
    nodemon({ script: 'js/app.js'
        , ext: 'html js'
        , ignore: [] //'ignored.js'
        , tasks: [] })
        .on('restart', function () {
            console.log('restarted!')
        })
})


// Run App

gulp.task('open', function(){
    gulp.src('./index.html')
        .pipe(open());
});

gulp.task('test', ['set-env'], function () {
    return gulp.src('./api/**/*.spec.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
});

gulp.task('set-env',function () {
    return env({
        file: "./config/local.env",
        vars: {
            NODE_ENV: 'test'
        }
    });
});



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



