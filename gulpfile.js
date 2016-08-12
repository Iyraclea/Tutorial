var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var pump = require('pump');
var merge = require('merge2');

var sassFiles = 'sass/**/*.scss';

var cssFiles = 'css/*.css';
var cssVendorJsFile = 'css/vendor/**/*.css';

var jsFiles = 'js/*.js';
var vendorJsFile = 'js/vendor/**/*.js';

gulp.task('sass-css', function() {
	
	var joincss = merge(
		gulp.src(cssVendorJsFile)
		,gulp.src(sassFiles)
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: [
				'Chrome >= 45',
				'Firefox >= 42',
				'Android >= 4',
				'Explorer >= 10',
				'iOS >= 9',
				'Safari >= 8',
			]
		}))
	);
	
	return merge(joincss, gulp.src(cssFiles)).pipe(concat('style.min.css'))
	.pipe(gulp.dest('css/dist'));
});

gulp.task('js', function(cb) {
	var options = {
		mangle: false,
		compress: {
			unused: false
		},
		preserveComments: 'license'
	};

	return merge(
		gulp.src(vendorJsFile)
		,gulp.src(jsFiles)
		.pipe(uglify(options))
	)
	.pipe(concat('functions.min.js'))
	.pipe(gulp.dest('js/dist'));
});

gulp.task('watch', function() {
    gulp.watch(sassFiles, ['sass-css']);
    gulp.watch(cssFiles, ['sass-css']);
    gulp.watch(jsFiles, ['js']);
});
