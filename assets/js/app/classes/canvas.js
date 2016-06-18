modules.app

.factory('canvas', ['$document', function($document) {
  var canvas = $document.find('canvas')[0];
  canvas.ctx = canvas.getContext('2d');

  return canvas;
}]);
