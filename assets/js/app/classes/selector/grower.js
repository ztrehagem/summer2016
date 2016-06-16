modules.app

.factory('grower', [function() {
  var ctx, canvas;
  var current, target, theta;

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
      theta = Math.atan((target.y - current.y) / (target.x - current.x));
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

      let sign = {
        x: Math.sign(distance.x),
        y: Math.sign(distance.y)
      };

      current.x += sign.x * Math.cos(theta) * SPEED;
      current.y += sign.x * Math.sin(theta) * SPEED;
      current.r += 80;
    },
    draw: function() {
      ctx.fillStyle = 'rgba(80, 80, 80, 1)';
      ctx.beginPath();
      ctx.arc(current.x, current.y, current.r, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(current.x, current.y, 20, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    }
  };
}]);
