"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');

var fileinclude = require('gulp-file-include');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

/**
 * DIRECTORY
 */
var root = "./public";
var language = {
    ko : "/ko"
};
var type = {
    pc : "/pc",
    mo : "/mo"
};
var srcRoot = "/src", //작업 폴더
    distRoot = "/dist"; //배포 폴더
var paths = { //작업&배포 폴더 트리 구조
    html: "/html",
    stylesheets : "/stylesheets",
    css : "/css",
    sass : "/sass",
    script : "/javascripts",
    map : "../map",
    images : "/images"
};
var typeRoot = {
    srcPc : root + language.ko + type.pc + srcRoot, //typeRoot.srcPc 배포
    distPc : root + language.ko + type.pc + distRoot, //typeRoot.distPc 작업

    srcMo : root + language.ko + type.mo + srcRoot, //typeRoot.srcMo 배포
    distMo : root + language.ko + type.mo + distRoot //typeRoot.distMo 작업
};

/**
 * html copy
 */
var htmlCopyFun = function(o){
    return gulp.src(root + o.language + o.type + srcRoot + paths.html + "/**/*.html")
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(root + o.language + o.type + distRoot + paths.html))
};
gulp.task('ko-pc-html-copy', function(){htmlCopyFun({language : language.ko, type : type.pc});});
gulp.task('ko-mo-html-copy', function(){htmlCopyFun({language : language.ko, type : type.mo});});

/**
 * SASS
 */
var sassFun = function(o){
    return gulp.src(root + o.language + o.type + srcRoot + paths.stylesheets + paths.sass + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync({outputStyle:'compact'}).on('error', sass.logError))// nested, expanded, compact, or compressed.
        .pipe(sourcemaps.write(paths.map))
        .pipe(gulp.dest(root + o.language + o.type + distRoot + paths.stylesheets + paths.css));
};
gulp.task('ko-pc-sass', function(){sassFun({language : language.ko, type : type.pc});});
gulp.task('ko-mo-sass', function(){sassFun({language : language.ko, type : type.mo});});

/**
 * SCRIPT USED
 */
var scriptFun = function(o){
    return gulp.src([
        root + o.language + o.type + srcRoot + paths.script + "/function/default.js",
        root + o.language + o.type + srcRoot + paths.script + "/function/*.js"
    ])
    .pipe(concat('design_common.js'))
    .pipe(gulp.dest(root + o.language + o.type + distRoot + paths.script));
};
gulp.task('ko-pc-script', function(){scriptFun({language: language.ko, type: type.pc});});
gulp.task('ko-mo-script', function(){scriptFun({language: language.ko, type: type.mo});});

/**
 * SCRIPT API
 */
var pluginFun = function(o){
    return gulp.src([
        root + o.language + o.type + srcRoot + paths.script + "/plugin/*.js"
    ])
    .pipe(concat('plugin.js'))
    .pipe(gulp.dest(root + o.language + o.type + distRoot + paths.script));
};
gulp.task('ko-pc-plugin', function(){pluginFun({language: language.ko, type: type.pc});});
gulp.task('ko-mo-plugin', function(){pluginFun({language: language.ko, type: type.mo});});

/**
 * images copy
 */
var imagesFun = function(o){
    return gulp.src(root + o.language + o.type + srcRoot + paths.images + "/**/*.{gif,jpg,png,svg}")
    .pipe(gulp.dest(root + o.language + o.type + distRoot + paths.images))
};
gulp.task('ko-pc-image-copy', function(){imagesFun({language : language.ko, type : type.pc});});
gulp.task('ko-mo-image-copy', function(){imagesFun({language : language.ko, type : type.mo});});

/**
 * WACTH
 */
gulp.task('pc-all', function(){
    var browserSyncPC = require('browser-sync').create();
    browserSyncPC.init({
        server: {
            baseDir: typeRoot.distPc,
            index: "work_list.html"
        },
        ui: false,
        port:5000
    });

    gulp.watch(typeRoot.srcPc + paths.stylesheets + '/**/*.scss', ['ko-pc-sass']);
    gulp.watch(typeRoot.srcPc + paths.script + "/function/*.js", ["ko-pc-script"]);
    gulp.watch([typeRoot.srcPc + paths.html + "/**/*.html", typeRoot.srcPc + "/include/*.html"], ['ko-pc-html-copy']);
    gulp.watch(typeRoot.srcPc + paths.images + "/**/*.{gif,jpg,png,svg}", ['ko-pc-image-copy']);
    gulp.watch([
        typeRoot.distPc + paths.stylesheets + '/**/*.css',
        typeRoot.distPc + paths.html + "/**/*.html",
        typeRoot.distPc + "/*.html",
        typeRoot.distPc + paths.script + "/*.js"
    ]).on('change', browserSyncPC.reload);
});

gulp.task('mo-all', function () {
    var browserSyncMo = require('browser-sync').create();
    browserSyncMo.init({
        server: {
            baseDir: typeRoot.distMo,
            index: "work_list.html"
        },
        ui: false,
        port: 5002
    });

    gulp.watch(typeRoot.srcMo + paths.stylesheets + '/**/*.scss', ['ko-mo-sass']);
    gulp.watch(typeRoot.srcMo + paths.script + "/function/*.js", ["ko-mo-script"]);
    gulp.watch([typeRoot.srcMo + paths.html + "/**/*.html", typeRoot.srcMo + "/include/*.html"], ['ko-mo-html-copy']);
    gulp.watch(typeRoot.srcMo + paths.images + "/**/*", ['ko-mo-image-copy']);
    gulp.watch([
        typeRoot.distMo + paths.stylesheets + '/**/*.css',
        typeRoot.distMo + paths.html + "/**/*.html",
        typeRoot.distMo + "/*.html",
        typeRoot.distMo + paths.script + "/*.js"
    ]).on('change', browserSyncMo.reload);
});

/**
 * TASK
 */
gulp.task('default', runSequence(
    'ko-pc-image-copy',
    'ko-mo-image-copy',
    'ko-pc-plugin',
    'ko-mo-plugin',
    'pc-all',
    'mo-all'
));