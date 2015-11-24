// INSTRUCTIONS: http://ericlbarnes.com/setting-gulp-bower-bootstrap-sass-fontawesome/

// defining dependencies and object to refer to paths
var 	gulp = require('gulp'),
		browserify = require('gulp-browserify'),
		reactify = require('reactify'),
		transform = require('vinyl-transform'),
		jshint = require('gulp-jshint'),
		babel = require("gulp-babel"),
		less = require('gulp-less'),
		path = require('path'),
    rsync = require('gulp-rsync');
		connect = require('gulp-connect'),
		config = {
			lessDir: './src/less',
			imagesDir: './src/images',
			aryaLessDir: '../arya-website/less',
			jsDir: './src/javascript',
			staticDir: './src/static',
      rsync: {
        src:  'dist/**',
        options: {
          destination: '/var/www/rtv-web.aryaapp.co/public_html',
          root: 'dist',
          hostname: 'arya-web', // needs to be setup in ~/.ssh/config
          username: 'root',
          incremental: true,
          progress: true,
          relative: true,
          emptyDirectories: true,
          recursive: true,
          clean: true,
          exclude: [],
          include: []
        }
      },
		};



// moves fonts to /public folder
gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
		.pipe(gulp.dest('./dist/fonts'));
});

// moves images to /public folder
gulp.task('images', function() {
    return gulp.src(config.imagesDir + '/**.*')
		.pipe(gulp.dest('./dist/images'));
});

// moves static folders to /public folder
gulp.task('static', function() {
    return gulp.src(config.staticDir + '/**/*.*')
		.pipe(gulp.dest('./dist'));
});

gulp.task('less', function () {
  return gulp.src([config.aryaLessDir + '/**/styles.less', config.lessDir + '/**/styles-rtv-app.less'])
    .pipe(less({
      paths: [ path.join(__dirname, 'config.lessDir', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'))
});

//takes app.js,  runs converts javasript ES6, minifies, then builds to /dist folder
gulp.task('jshint', function () {
  return gulp.src(config.jsDir + '**/*.js')
	.pipe(jshint({ esnext : true })) // lets jshint know we're using es6
	.pipe(jshint.reporter('default'))
});

gulp.task('babel', function () {
	return gulp.src(config.jsDir + '/**/*.js')
    .pipe(babel()) //convert ES6 to ES5
    .pipe(gulp.dest('./src/js5'))
});

//bundle is dependant on babel to run first
gulp.task('bundle', ['babel'], function () {
	return gulp.src('./src/js5/app.js')
    .pipe(browserify(
    	{ transform: [reactify] }
    ))
    .pipe(gulp.dest('./dist/js'))
});

// gulp.task('bundle',function() {
// 	return gulp.src('./src/js5/app.js')
//     .pipe(browserify({ // combine nodes to single .js file
//       transform: [reactify]
//     })
//     .pipe(gulp.dest('./public/js')) // save in public folder
// });

// makes it easy for collaborators to install everything by running gulp-bower
gulp.task('bower', function() {
    return bower()
		.pipe(gulp.dest(config.bowerDir))
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 4444
  });
});
gulp.task('html', function () {
  gulp.src('./dist/index.html')
    .pipe(connect.reload());
});

// gulp.task('doc', function () {
//   gulp.src(config.jsDir + '/**/*.js')
//   	.pipe(yuidoc())
//   	.pipe(gulp.dest("./dist/doc"));
// });

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch([config.lessDir + '/**/*.less', config.aryaLessDir + '/**/*.less' ] , ['less']);
	gulp.watch(config.jsDir + '/**/*.js', ['babel','bundle']);
	gulp.watch(config.staticDir + '/**/*.*', ['static']);
});
// runs basic tasks when first using gulp
gulp.task('default', ['bower', 'icons', 'css']);


/**
 * Copy files and folder to server
 * via rsync
 */
gulp.task('deploy', function() {
  return gulp.src(config.rsync.src)
    .pipe(rsync(config.rsync.options));
});

