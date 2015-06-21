var gulp		=	require('gulp');
var concat 		= 	require('gulp-concat');
var uglify 		= 	require('gulp-uglify');
var less 		= 	require('gulp-less');
var browserSync	=	require('browser-sync').create();
var reload		=	browserSync.reload;

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src(['js/vendor/*.js','js/*.js'])
    		//.pipe(uglify())
    		.pipe(concat('main.js'))
	        .pipe(gulp.dest('dist/js'));
});

// process LESS files and return the stream.
gulp.task('less', function () {
    return gulp.src(['css/main.less'])
	    	.pipe(less({compress: true}))
	    	.pipe(concat('main.min.css'))	        
	        .pipe(gulp.dest('dist/css'));
});

gulp.watch('js/**/*.js', ['js']);
gulp.watch('css/**/*.less', ['less']);
gulp.watch('*.html').on('change', browserSync.reload);
gulp.watch('dist/**').on('change', browserSync.reload);

gulp.task('default', ['browser-sync', 'js', 'less']);