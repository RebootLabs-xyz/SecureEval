var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    return gulp.src(['./deps/*.js', './secureeval.js'])
        .pipe(concat('secureeval_build.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('secureeval_build.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('scripts'));