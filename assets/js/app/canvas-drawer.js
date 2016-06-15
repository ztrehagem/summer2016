angular.module('app')

.factory('canvasDrawer', ['apis', function(apis) {
  var x = 0, y = 0;

  function clear(ctx, canvas) {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  return {
    update: function(ctx, canvas) {
      x++;
      y++;
    },
    draw: function(ctx, canvas) {
      clear(ctx, canvas);

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }
  }
}]);
