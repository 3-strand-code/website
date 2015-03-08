(function() {
    'use strict';

    var gulp = require('gulp');
    var autoprefixer = require('gulp-autoprefixer');
    var less = require('gulp-less');
    var webserver = require('gulp-webserver');
    var plumber = require('gulp-plumber');

    var paths = {
        root: './'
    };


    gulp.task('less', function() {
        return gulp.src([
            paths.root + '*.less'
        ])
            .pipe(plumber(function onError(err) {
                    console.log(err.message);
                    this.emit('end');
                }
            ))
            .pipe(less())
            .pipe(autoprefixer())
            .pipe(gulp.dest('.'));
    });

    gulp.task('watch', function() {
        gulp.watch(paths.root + '*.less', ['less']);
    });

    gulp.task('serve', function() {
        return gulp.src(paths.root)
            .pipe(webserver({
                https: false,
                host: 'localhost',
                port: '8000',
                fallback: 'index.html',
                livereload: true,
                directoryListing: false,
                open: false,
            }));

    });

    gulp.task('default', [
        'less',
        'serve',
        'watch',
    ]);

}());
