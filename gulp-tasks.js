module.exports = {
  sass: { // can wrap array
    src: 'assets/sass/**/*.scss', // can wrap array
    dest: 'public/css/'
  },
  js: {
    src: 'assets/js/**/*.js',
    dest: 'public/js/',
    concat: true,
    destfile: 'app.js'
  },
  html: {
    src: 'assets/html/**/*.html',
    dest: 'public/'
  }
};
