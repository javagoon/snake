var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task( 'default', [ 'browserSync' ] );
gulp.task('browserSync',function(){
    browserSync.init({
        server: {
            baseDir: './'
        }

    }),
     gulp.watch('*.html',browserSync.reload);   
     gulp.watch('*.js',browserSync.reload);  
     gulp.watch('*.css',browserSync.reload);     
});

