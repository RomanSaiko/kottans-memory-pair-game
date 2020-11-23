var gulp          = require('gulp'),
	sass          = require('gulp-sass'),
    clean         = require('gulp-clean'),
	browserSync   = require('browser-sync').create(),
	notify        = require('gulp-notify');

gulp.task('clean', function() {
    return gulp.src('build/')
        .pipe(clean());
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('styles', function() {
	return gulp.src('app/sass/*.sass')
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src('app/js/scripts.js')
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('images', function() {
    return gulp.src('app/img/*.*')
		.pipe(gulp.dest('build/img/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'build'
        },
        notify: false
    })
});

gulp.task('watch', function() {
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/sass/*.sass', gulp.parallel('styles'));
    gulp.watch('app/js/*.js', gulp.parallel('scripts'));
    gulp.watch('app/img/*.*', gulp.parallel('images'));
});

gulp.task('default', gulp.parallel('html', 'styles', 'scripts', 'images', 'browser-sync', 'watch'));
