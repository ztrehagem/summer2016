angular.module('app')

.run(['$window', '$document', 'canvasDrawer', function($window, $document, canvasDrawer) {
  var canvas = $document.find('canvas')[0];
  var ctx = canvas.getContext('2d');
  var requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;

  setCanvasWidth();
  $window.addEventListener('resize', setCanvasWidth);

  frame();

  function frame() {
    canvasDrawer.update(ctx, canvas);
    canvasDrawer.draw(ctx, canvas);
    requestAnimationFrame(frame);
  }

  function setCanvasWidth() {
    canvas.width = $window.innerWidth;
    canvas.height = $window.innerHeight;
  }
}]);
