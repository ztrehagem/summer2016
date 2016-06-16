angular.module('app')

.run(['$window', '$document', 'drawer', 'cursor', function($window, $document, drawer, cursor) {
  var canvas = $document.find('canvas')[0];
  var ctx = canvas.getContext('2d');
  var requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;

  setCanvasWidth();
  $window.addEventListener('resize', setCanvasWidth);
  $window.addEventListener('mousemove', cursor.onMouseMove);

  drawer.init(ctx, canvas);
  frame();

  function frame() {
    drawer.update(ctx, canvas);
    drawer.draw(ctx, canvas);
    requestAnimationFrame(frame);
  }

  function setCanvasWidth() {
    canvas.width = $window.innerWidth;
    canvas.height = $window.innerHeight;
  }
}]);
