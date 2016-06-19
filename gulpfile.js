var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var html = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var concat = require('gulp-concat');
var nop = require('gulp-nop');
var gulpif = require('gulp-if');
var minimist = require('minimist');
var tasks = require('./gulp-tasks.js');

var options = minimist(process.argv.slice(2), {
  alias: {
    p: 'production'
  },
  default: {
    production: false
  }
});

console.log(options);

gulp.task('sass', function() {
  forEachTask(tasks.sass, function(task) {
    gulp.src(task.src)
      .pipe(plumber())
      .pipe(gulpif(!options.production, sourcemaps.init()))
      .pipe(sass())
      .pipe(gulpif(!options.production, sourcemaps.write('./')))
      .pipe(gulp.dest(task.dest));
  });
});

gulp.task('js', function() {
  forEachTask(tasks.js, function(task) {
    gulp.src(task.src)
      .pipe(plumber())
      .pipe(gulpif(!options.production, sourcemaps.init()))
      .pipe(gulpif(task.concat, concat(task.destfile)))
      .pipe(gulpif(options.production, uglify()))
      .pipe(gulpif(!options.production, sourcemaps.write('./')))
      .pipe(gulp.dest(task.dest));
  });
});

gulp.task('html', function() {
  forEachTask(tasks.html, function(task) {
    gulp.src(task.src)
      .pipe(plumber())
      .pipe(html())
      .pipe(gulp.dest(task.dest));
  });
});

gulp.task('default', [
  'sass',
  'js',
  'html'
]);

gulp.task('w', ['watch']);
gulp.task('watch', ['default'], function() {
  for( taskname in tasks ) {
    forEachTask(tasks[taskname], function(task) {
      gulp.watch(task.src, [taskname]);
    });
  }
});

gulp.task('s', ['server']);
gulp.task('server', function() {
  browser({
    server: {
      baseDir: 'public/'
    }
  });
});

function forEachTask(tasks, fn) {
  if( !tasks ) return;
  (Array.isArray(tasks) ? tasks : [tasks]).forEach(fn);
}
