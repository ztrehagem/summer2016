angular.module('app')

.run(['$window', 'canvas', 'drawer', 'cursor', function($window, canvas, drawer, cursor) {
  // TODO getLocationsなどの待機
  var requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;

  setCanvasWidth();
  $window.addEventListener('resize', setCanvasWidth);
  $window.addEventListener('mousemove', cursor.onMouseMove);

  drawer.init();
  frame();

  function frame() {
    drawer.update();
    drawer.draw();
    requestAnimationFrame(frame);
  }

  function setCanvasWidth() {
    canvas.width = $window.innerWidth;
    canvas.height = $window.innerHeight;
  }
}]);
