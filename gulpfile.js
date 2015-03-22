var gulp = require('gulp'),
	mainBowerFiles = require('main-bower-files'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload');


gulp.task('getbower', function() {
	return gulp.src(mainBowerFiles(), {
			base: 'bower_components'
		})
		.pipe(concat('bowerFiles.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib'));
});

gulp.task('concatlib', function() {
	return gulp.src('js/lib/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('uglifylib', function() {
	return gulp.src('js/all.js')
		.pipe(uglify({
			mangle: false
		}))
		.pipe(rename('all.min.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('uglifyjs', function() {
	return gulp.src('js/base.js')
		.pipe(uglify())
		.pipe(rename('base.min.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('sass', function() {
	return gulp.src('sass/base.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});

gulp.task('cssmin', function() {
	gulp.src('css/base.css')
		.pipe(cssmin())
		.pipe(rename('base.min.css'))
		.pipe(gulp.dest('public/css'));
})

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('sass/base.scss', ['sass']);
});

gulp.task('buildlib', ['getbower', 'concatlib', 'uglifylib']);
gulp.task('minify', ['cssmin', 'uglifyjs']);