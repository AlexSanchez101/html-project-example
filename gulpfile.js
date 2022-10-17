"use strict";
const buildDir = './build';
const srcDir = './src';
//Load plugins
const gulp         = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browsersync  = require("browser-sync").create();
const cleanCSS     = require("gulp-clean-css");
const plumber      = require("gulp-plumber");
const rename       = require("gulp-rename");
const sass         = require("gulp-sass");
const nunjucksRender = require('gulp-nunjucks-render');
const uglify       = require("gulp-uglify");


function browserSync(cb) {
  browsersync.init(
    {
      server: {
        baseDir: buildDir
      }
    }
  )
  cb();
}
function reloadBrowser(cb) {
  browsersync.reload();
  cb();
}

//Compile css
function css() {
  return gulp
    .src(srcDir + '/assets/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest(buildDir + '/assets/css'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(buildDir + '/assets/css'))
    .pipe(browsersync.stream());
}


//HTML nunjucks
function compileNunjucks() {
    return gulp.src(srcDir + '/nunjucks/pages/**/*.+(html|nunjucks)')
      .pipe(
        nunjucksRender({
          path: [srcDir + '/nunjucks/templates']
        })
      )
      .pipe(gulp.dest(buildDir));
  }
  

//JS task
function js() {
  return gulp
    .src([
      srcDir + '/assets/js/**/*.js',
    ])
    .pipe(gulp.dest(buildDir + '/assets/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(buildDir + '/assets/js'))
    .pipe(browsersync.stream());
}


function watchFiles(cb) {
  gulp.watch([srcDir + '/assets/scss/**/*'], css);
  gulp.watch([srcDir + "/assets/js/**/*"], js);
  gulp.watch([srcDir + '/nunjucks/**/*.+(html|nunjucks)'], compileNunjucks);
  gulp.watch([buildDir + "/**/*.html"], reloadBrowser);
  cb();
}


const build  = gulp.series(css, js, compileNunjucks);
const dev  = gulp.series(build, gulp.parallel(watchFiles, browserSync));


exports.build     = build
exports.dev       = dev
exports.default   = dev
