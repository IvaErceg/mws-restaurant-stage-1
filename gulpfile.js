const gulp = require("gulp");
const imagemin = require("gulp-imagemin");

gulp.task("default", function() {});

gulp.task("jpgs", function() {
  return gulp
    .src("src/images/*.jpg")
    .pipe(
      imagemin([imagemin.jpegtran({ progressive: true })], { verbose: true })
    )
    .pipe(gulp.dest("dist/img"));
});
