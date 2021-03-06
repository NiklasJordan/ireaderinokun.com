/*eslint-env node */
var gulp = require('gulp');
var gutil = require('gulp-util');


/* *************
	CSS
************* */

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var autoprefixer = require('autoprefixer');
var postcssCriticalCSS = require('postcss-critical-css');
var postcssProcessors = [
	postcssCriticalCSS({
		outputPath: 'assets/css'
	}),
	autoprefixer( {
		browsers: [
			'Explorer >= 11',
			'last 2 Explorer versions',
			'last 2 ExplorerMobile versions',
			'last 2 Edge versions',

			'last 2 Firefox versions',
			'last 2 FirefoxAndroid versions',

			'last 2 Chrome versions',
			'last 2 ChromeAndroid versions',

			'last 2 Safari versions',
			'last 2 iOS versions',

			'last 2 Opera versions',
			'last 2 OperaMini versions',
			'last 2 OperaMobile versions',

			'last 2 Android versions',
			'last 2 BlackBerry versions'
		]
	} )
];

var sassMainFile = '_css/main.scss';
var sassFiles = '_css/*.scss';

gulp.task('css', function() {
	gulp.src(sassMainFile)
		.pipe(
			postcss(postcssProcessors, {syntax: scss})
		)
		.pipe(
			sass({ outputStyle: 'expanded' }) // compressed
			.on('error', gutil.log)
		)
		.pipe(gulp.dest('assets/css'));
});



/* *************
	JS
************* */

var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var babel = require('gulp-babel');
var jsFiles = '_scripts/*.js';

gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(
			babel({ presets: ['es2015'] })
			.on('error', gutil.log)
		)
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('assets/js'));
});




	



/* *************
	WATCH
************* */

gulp.task('watch', function() {
	gulp.watch(sassFiles,['css']);
	gulp.watch(jsFiles,['js']);
});



/* *************
	DEFAULT
************* */

gulp.task('default', ['css', 'js', 'watch']);
