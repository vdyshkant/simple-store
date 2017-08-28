var gulp         = require('gulp'),
    babel        = require("gulp-babel"),
    pug          = require('gulp-pug'),
    // browserify   = require('gulp-browserify'),
    livereload   = require('gulp-livereload'), // added 2016-07-11
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglify'),
    connect      = require('gulp-connect'),
    sass         = require('gulp-sass'),
    rename       = require('gulp-rename'),
    copy         = require('gulp-copy'), // added 2016-10-04
    replace      = require('gulp-replace'), // added 2016-10-04
    jshint       = require('gulp-jshint'),  // npm install --save-dev jshint gulp-jshint jshint-stylish
    gulpif       = require('gulp-if'),
    filter       = require('gulp-filter'), // added 2016-12-19
    concat       = require('gulp-concat'); // added 2016-12-19


var env = process.env.NODE_ENV || 'development'; // if we do not specify explicitly a value, then it defaults to the development
var outputDir = 'build';

/////////////////////////
///  ERROR handler  /////
/////////////////////////
function errorLog(err){
  console.log(err.message);
  this.emit('end');
}

gulp.task('js', function() {
    // return gulp.src('src/js/modules/*.js')     // here we specify main js file as an entry point
    return gulp.src([
      '!src/js/clib/*.js', // ignore this file
      'dev/app.js', // e.g. /path/to/mymodule/mymodule.js',
      'dev/services.js', // e.g. /path/to/mymodule/mymodule.js',
      'dev/directives.js', // e.g. /path/to/mymodule/mymodule.js',
      'dev/controllers/main.controller.js', // e.g. /path/to/mymodule/mymodule.js',
      'dev/controllers/home.controller.js', // e.g. /path/to/mymodule/mymodule.js',
      'dev/controllers/product.controller.js', // e.g. /path/to/mymodule/mymodule.js',
      'dev/controllers/edit.controller.js' // e.g. /path/to/mymodule/mymodule/*.js'
      // 'src/js/services.js', // e.g. /path/to/mymodule/mymodule.js',
      // 'src/js/controllers/main.controller.js', // e.g. /path/to/mymodule/mymodule.js',
      // 'src/js/controllers/home.controller.js', // e.g. /path/to/mymodule/mymodule.js',
      // 'src/js/controllers/edit.controller.js' // e.g. /path/to/mymodule/mymodule/*.js'
    ])     // выборка files from glob
        .pipe(babel())
        .pipe(concat('main.js'))
            // .pipe(gulp.dest(outputDir + '/js'))
        .pipe(gulp.dest(outputDir))


        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))      // install jshint-stylish dependency
        // .pipe(jshint.reporter('fail'))
        // .pipe(browserify({ debug: env === 'development' })) // we pass the entry point on to the browserify plug. //2// include the source maps only if we're i a dev environment
        .pipe(gulpif(env === 'production', uglify())) // if our environment is production, only then uglify it
        // debug: true --- this way browserify include sourcemaps with the compiled js
        // now we just have to specify an output folder
        .pipe(gulpif(env === 'production', rename({suffix:'.min'})))
        .on('error', errorLog)
            // .pipe(gulp.dest(outputDir + '/js'))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload());
});

gulp.task('sass', function() {
    var config = {};

    if (env === 'development') {
        config.sourceComments = 'map';
    }

    if (env === 'production') {
        config.outputStyle = 'compressed';
    }


    return gulp.src('dev/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(config).on('error', sass.logError))
        // .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: [
            'Firefox 3.5',
            'Opera 9',
            'Safari 3.1',
            'Chrome 5',
            '>1%',
            'ie 8'
          ],
          remove: false
        }))
        .pipe(gulpif(env === 'production', rename({suffix:'.min'})))
        .pipe(sourcemaps.write())
            // .pipe(gulp.dest(outputDir + '/css'))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload());
});

gulp.task('pug', function() {
  return gulp.src([
    // '!src/templates/partials/*.pug', // ignore this file
    // '!src/templates/conf/*.pug', // ignore this file
    // 'src/templates/**/*.pug'   // ignore all files
    'dev/index.pug',
    'dev/views/edit.pug',
    'dev/views/home.pug',
    'dev/views/product.pug'
    // 'dev/views/home.pug',
    // 'dev/views/product.pug'
  ], { base: 'dev/' })     // выборка files from glob; // base: https://github.com/pugjs/gulp-pug/issues/124
        .pipe(pug( { pretty: true } ))                             // push this^^^ query to pug pluguin
        .on('error', errorLog)
        .pipe(gulp.dest(outputDir))            // take every compiled html file and pipe it to an output folder
        .pipe(connect.reload());
});


gulp.task('watch', function() {
    // livereload.listen();

    gulp.watch('dev/**/*.pug', ['pug']);
    gulp.watch('dev/**/*.js', ['js']);
    gulp.watch('dev/**/*.scss', ['sass']);
    // gulp.watch('src/js/**/*.js', ['copyJsLib']);
        // gulp.watch('src/js/**/*.js', ['copy']);
    // gulp.watch('src/img/**/*.{png,svg,jpg,ico}', ['copyImages']);
    // gulp.watch('bower.json', ['clib']);
});

gulp.task('connect', function() {
    connect.server({
        root: [outputDir],
        // base: 'http://localhost',
        port: 9012,
        livereload: true
    });
});



gulp.task('default', ['connect', 'js', 'sass', 'pug', 'watch' /*, 'copyJsLib',  */ ]);
