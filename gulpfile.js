"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');

var terser = require("gulp-terser");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");

var del = require("del");

var server = require("browser-sync").create();

//Копировать ресурсы в папку build
gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**"
  ], {
	  base: "source"
  })
  .pipe(gulp.dest("build"));
});

//Очистить папку build
gulp.task("clean", function() {
  return del("build");
});

//Оптимизировать картинки
gulp.task("imagemin", function() {
  return gulp.src("build/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

//Перевести картинки в формат webp
gulp.task("webp", function() {
  return gulp.src("build/img/**/*.{png,jpg}")
	.pipe(webp({quality: 90}))
	.pipe(gulp.dest("build/img"));
});

//Собрать sprite
gulp.task("sprite", function() {
  return gulp.src("build/img/sprite-*.svg")
  //очищаем от fill
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
    },
    parserOptions: { xmlMode: true }
  }))
  //исправляем возможные ошибки
  .pipe(replace('&gt;', '>'))
  .pipe(svgstore({
	inlineSvg: true
	}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

//Собрать css и минимизировать
gulp.task("css", function () {
  return gulp.src("source/less/style.less")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

//Минифицировать js
gulp.task("jsmin", function () {
  return gulp.src("source/js/*.js")
    .pipe(terser())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"));
});

//Собрать html
gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
	  include()
	  ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

// //минимизировать html
// gulp.task("htmlmin", function() {
//   return gulp.src("build/*.html")
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest("build"));
// });


//Запустить сервер
gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("build", gulp.series("clean", "copy", "css", "jsmin", "imagemin", "webp", "sprite", "html"));

gulp.task("start", gulp.series("build", "server"));
