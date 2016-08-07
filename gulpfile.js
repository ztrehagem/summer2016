var Resource = require('./gulp-template/resource.js');
var GulpTask = require('./gulp-template/gulp-task.js');

Resource.config.srcDir = 'assets/';

Resource.add('html', Resource.defaults.html());
Resource.add('sass', Resource.defaults.sass());
Resource.add('js', Resource.defaults.js());

GulpTask.defineDefaults();
