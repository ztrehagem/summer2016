angular.module('app')

.run(['$window', '$document', 'apis', function($window, $document, apis) {
  console.log('app run');

  var that = this;
  var canvas = $document.find('canvas')[0];
  var ctx = canvas.getContext('2d');
  var requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;

  setCanvasWidth();
  $window.addEventListener('resize', setCanvasWidth);

  var x = 0, y = 0;
  // draw();

  // --- functions --- //

  function draw() {
    x++;
    y++;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    requestAnimationFrame(draw);
  }

  function setCanvasWidth() {
    canvas.width = $window.innerWidth;
    canvas.height = $window.innerHeight;
    console.log('canvas resized');
  }
}]);
