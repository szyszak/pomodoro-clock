'use strict';
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();

const reload = browserSync.reload;

// compile sass files to css

gulp.task("sass", function () {
  return gulp.src("./src/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({
      browser: ["last 15 versions"],
      cascade: false
    }))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.reload({stream:true}))
});

// compile pug files to html

gulp.task("pug", () => {
  return gulp.src("src/*.pug")
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("./dist"))
});

// send scripts to dist folder

gulp.task("js", () => {
  gulp.src("./src/*.js")
  .pipe(gulp.dest("./dist"));
});

// working directory

gulp.task("browser-sync", ["sass", "pug", "js"], () => {
  browserSync.init({
      open: false,
      server: {
        baseDir: "./dist"
      }
  });
});

// watch files compiling

gulp.task("watch", () => {
  gulp.watch("./src/*.sass", ["sass"]);
  gulp.watch("./src/*.pug", ["pug"]);
  gulp.watch("./dist/*.html").on("change", reload);
  gulp.watch("./src/*.js", ["js"]);
  gulp.watch("./dist/*.js").on("change", reload);
});

// default task

gulp.task("default", ["watch", "browser-sync"]);
