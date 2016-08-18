var Resource = require('./gulp-template/resource.js');
var GulpTask = require('./gulp-template/gulp-task.js');
var config = require('./gulp-template/config.js');

config.srcDir = 'assets/';

Resource.add('html', Resource.templates.html());
Resource.add('sass', Resource.templates.sass());
Resource.add('js', Resource.templates.js());

GulpTask.add('html', GulpTask.templates.html());
GulpTask.add('sass', GulpTask.templates.sass());
GulpTask.add('js', GulpTask.templates.js());

GulpTask.define();
GulpTask.defineDefaultTasks();
