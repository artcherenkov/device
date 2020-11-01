"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const del = require("del");
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');

const concatCss = require('gulp-concat-css');
const concatJs = require('gulp-concat');

gulp.task("clean", function () {
  return del("build");
})

gulp.task("copy", function () {
  return gulp.src([
      "src/fonts/*.{woff,woff2}",
      "src/img/**",
      "src/*.ico"
    ], {
      base: "src"
    })
    .pipe(gulp.dest("./"));
})

gulp.task("css", function () {
  return gulp.src("src/css/*.css")
    .pipe(concatCss("bundle.css"))
    .pipe(plumber())
    .pipe(gulp.dest("./css"))
    .pipe(sourcemap.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("./css"))
    .pipe(csso())
    .pipe(rename("bundle.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("./css"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("./"));
})

gulp.task("index-js", function () {
  return gulp.src('src/js/*.js')
    .pipe(concatJs('index.js'))
    .pipe(gulp.dest('./js'))
    .pipe(terser())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest('./js'));
})

gulp.task("catalog-js", function () {
  return gulp.src(['src/js/check-header-input.js', 'src/js/catalog-list-toggle.js'])
    .pipe(concatJs('catalog.js'))
    .pipe(gulp.dest('./js'))
    .pipe(terser())
    .pipe(rename("catalog.min.js"))
    .pipe(gulp.dest('./js'));
})

gulp.task("server", function () {
  server.init({
    server: "./",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/css/*.css", gulp.series("css"));
  gulp.watch("src/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
})

gulp.task("build", gulp.series(
  // "clean",
  "copy",
  "css",
  "html",
  "index-js",
  "catalog-js"
));

gulp.task("start", gulp.series("build", "server"));
