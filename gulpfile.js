'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    stylus = require('gulp-stylus'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        libsJs: 'build/js/libs',
        css: 'build/css/',
        libsCss: 'build/css/libs/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        libsJs: 'src/js/libs/**/*.*',
        style: 'src/styles/main.styl',
        libsStyles: 'src/styles/libs/**/*.*',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/styles/**/*.styl',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        libsJs: 'src/js/libs/**/*.*',
        libsStyles: 'src/styles/libs/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    }/*,
    tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: "Frontend_Devil"*/
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('js-libs:build', function () {
    gulp.src(path.src.libsJs) //Найдем наши libs
        .pipe(gulp.dest(path.build.libsJs)) //Выплюнем готовые libs в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.styl
        .pipe(stylus({
            'include css': true,
            compress: true
        })) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

gulp.task('style-libs:build', function () {
    gulp.src(path.src.libsStyles) //Выберем наши css-дшиы

        .pipe(gulp.dest(path.build.libsCss)) //И в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'js-libs:build',
    'js:build',
    'style-libs:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.libsStyles], function(event, cb) {
        gulp.start('style-libs:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.libsJs], function(event, cb) {
        gulp.start('js-libs:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);
