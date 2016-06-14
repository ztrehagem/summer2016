var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var html = require('gulp-minify-html');
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var concat = require('gulp-concat');
var nop = require('gulp-nop');

var tasks = {
  sass: { // can wrap array
    src: 'assets/sass/**/*.scss', // can wrap array
    dest: 'public/css/'
  },
  js: {
    src: 'assets/js/**/*.js',
    dest: 'public/js/',
    concat: false,
    destfile: 'app.js'
  },
  html: {
    src: 'assets/html/**/*.html',
    dest: 'public/'
  }
};

gulp.task('sass', function() {
  if( !tasks.sass ) return;

  (Array.isArray(tasks.sass) ? tasks.sass : [tasks.sass]).forEach(function(task) {
    gulp.src(task.src)
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest(task.dest));
  });
});

gulp.task('js', function() {
  if( !tasks.js ) return;

  (Array.isArray(tasks.js) ? tasks.js : [tasks.js]).forEach(function(task) {
    gulp.src(task.src)
      .pipe(plumber())
      .pipe(uglify())
      .pipe(task.concat ? concat(task.destfile) : nop())
      .pipe(gulp.dest(task.dest));
  });
});

gulp.task('html', function() {
  if( !tasks.html ) return;

  (Array.isArray(tasks.html) ? tasks.html : [tasks.html]).forEach(function(task) {
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
  for( prop in tasks ) {
    (Array.isArray(tasks[prop]) ? tasks[prop] : [tasks[prop]]).forEach(function(task) {
      gulp.watch(task.src, [prop]);
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
