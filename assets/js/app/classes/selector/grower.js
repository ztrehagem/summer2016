modules.app

.factory('grower', [function() {
  var ctx, canvas;
  var start, current, target, theta, moment, mov;
  const SPEED = 0.06;

  return {
    init: function(_ctx, _canvas, student) {
      ctx = _ctx;
      canvas = _canvas;

      current = {
        x: student.x,
        y: student.y,
        r: student.r
      };
      target = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2
      };

      moment = {
        x: (target.x - current.x) * SPEED,
        y: (target.y - current.y) * SPEED,
        r: (target.r - current.r) * SPEED
      };

      mov = 0;
    },
    update: function() {
      if( (mov += SPEED) > 1 ) {
        current = target;
        return true;
      }
      current.x += moment.x;
      current.y += moment.y;
      current.r += moment.r;
    },
    draw: function(bgColor) {
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.arc(current.x, current.y, current.r, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    }
  };
}]);
