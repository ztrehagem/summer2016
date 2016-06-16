modules.app

.factory('grower', [function() {
  var ctx, canvas;
  var current, target, r;

  return {
    init: function(_ctx, _canvas, student) {
      ctx = _ctx;
      canvas = _canvas;

      current = {
        x: student.x,
        y: student.y
      };
      target = {
        x: canvas.width / 2,
        y: canvas.height / 2
      };
      r = student.r;
    },
    update: function() {
      const SPEED = 20;

      let distance = {
        x: target.x - current.x,
        y: target.y - current.y
      };

      distance.r = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

      if( distance.r <= SPEED ) {
        current = target;
        return true;
      }

      let theta = Math.atan(distance.y / distance.x);
      current.x += -Math.cos(theta) * SPEED;
      current.y += -Math.sin(theta) * SPEED;
      r += 80;
    },
    draw: function() {
      ctx.fillStyle = 'rgba(80, 80, 80, 1)';
      ctx.beginPath();
      ctx.arc(current.x, current.y, r, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    }
  };
}]);
