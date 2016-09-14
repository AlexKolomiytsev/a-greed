/**
 * Created by alexanderbondarenko on 9/14/16.
 */
var gulp = require('gulp'),
    del = require('del'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    browserify = require('gulp-browserify'),
    stringify = require('stringify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    concat = require('gulp-concat');

var path = {
    build: {
        prod: {
            style: 'public/prod/style/',
            js: 'public/prod/js/secondform/',
            html: 'public/prod/'
        },
        dev: {
            style: 'public/dev/style/',
            js: 'public/dev/js/',
            html: 'public/dev/'
        }
    },
    src: {
        style: 'resources/assets/less/main.less',
        js: 'resources/assets/js/main.js',
        html: 'resources/assets/*.html'
    },
    watch: {
        style: 'resources/assets/less/**/*',
        js: 'resources/assets/js/**/*',
        html: 'resources/assets/*.html'
    },
    clean: {
        dev: {
            style: 'public/dev/less/**/*',
            js: 'public/dev/js/**/*'
        },
        prod: {
            style: 'public/prod/less/**/*',
            js: 'public/prod/js/**/*'
        }
    }
};


/**
 * development
 **/

gulp.task('less:dev', function () {
    return gulp.src(path.src.style)
        .pipe(less({}))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.dev.style));
});

gulp.task('js:dev', function () {
    return gulp.src(path.src.js)
        .pipe(browserify({
            insertGlobals: true,
            transform: stringify(['.html']),
            debug: true
        }))
        .pipe(gulp.dest(path.build.dev.js));
});

gulp.task('html:dev', function () {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.dev.html));
});

gulp.task('clean:dev', function () {
    return del([path.clean.dev.style, path.clean.dev.js]);
});

gulp.task('build:dev',
    gulp.series(
        'clean:dev',
        gulp.parallel(
            'less:dev',
            'js:dev',
            'html:dev'
        ))
);

gulp.task('watch', function () {
    watch(path.watch.style, gulp.series('less:dev'));
    watch(path.watch.js, gulp.series('js:dev'));
    watch(path.watch.html, gulp.series('html:dev'));
});

gulp.task('dev', gulp.series('build:dev', 'watch'));

/**
 *
 * production
 *
 * **/

gulp.task('less:prod', function () {
    return gulp.src(path.src.style)
        .pipe(less({}))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.prod.style));
});

gulp.task('js:prod', function () {
    return gulp.src(path.src.js)
        .pipe(browserify({
            insertGlobals: true,
            transform: stringify(['.html']),
            debug: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.prod.js));
});

gulp.task('html:prod', function () {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.prod.html));
});


gulp.task('clean:prod', function () {
    return del([path.clean.prod.style, path.clean.prod.js]);
});

gulp.task('build:prod',
    gulp.series(
        'clean:prod',
        gulp.parallel(
            'less:prod',
            'js:prod',
            'html:prod'
        ))
);


gulp.task('prod', 'build:prod');