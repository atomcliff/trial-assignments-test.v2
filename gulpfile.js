// Include gulp
let gulp = require("gulp");
let browsersync = require("browser-sync").create();
// Include Our Plugins
(less = require("gulp-less")),
  (postcss = require("gulp-postcss")),
  (autoprefixer = require("autoprefixer"));

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return gulp.src("./index.html").pipe(browsersync.stream());
}

function script() {
  return gulp.src("./js/script.js").pipe(browsersync.stream());
}

const css = () => {
  return gulp
    .src("./less/main.less")
    .pipe(less({ strictMath: true }))
    .pipe(postcss([autoprefixer({ browsers: ["> 1%", "IE 9", "IE 10"] })]))
    .pipe(gulp.dest("./css"))
    .pipe(browsersync.stream());
};

const watch = () => {
  gulp.watch("./index.html", html);
  gulp.watch("./less/**/*.less", css);
  gulp.watch("./js/**/*.js", script);
};

exports.css = css;
exports.watch = watch;

exports.default = gulp.series(
  gulp.parallel(html, css, script, watch, browserSync)
);
