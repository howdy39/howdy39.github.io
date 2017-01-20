var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("index.html", ['bs-reload']);
    gulp.watch("css/*.css", ['bs-reload']);
    gulp.watch("js/*.js", ['bs-reload']);
    
});
