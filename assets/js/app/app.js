angular.module('app')

.run(['$window', 'canvas', 'parent', 'cursor', function($window, canvas, parent, cursor) {
  // TODO getLocationsなどの待機
  var requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;

  setCanvasWidth();
  $window.addEventListener('resize', setCanvasWidth);
  $window.addEventListener('mousemove', cursor.onMouseMove);

  parent.init();
  frame();

  function frame() {
    parent.update();
    parent.draw();
    requestAnimationFrame(frame);
  }

  function setCanvasWidth() {
    canvas.width = $window.innerWidth;
    canvas.height = $window.innerHeight;
  }
}]);
