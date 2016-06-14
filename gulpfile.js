var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var plumber = require("gulp-plumber");
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
    .pipe(gulp.dest(task.dest))
  });
});

gulp.task('default', [
  'sass',
  'js'
]);

gulp.task('watch', ['default'], function() {
  for( prop in tasks ) {
    (Array.isArray(tasks[prop]) ? tasks[prop] : [tasks[prop]]).forEach(function(task) {
      gulp.watch(task.src, [prop]);
    });
  }
});
