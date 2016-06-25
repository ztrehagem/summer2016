modules.app

.service('selector.before', ['canvas', 'Animator', function(canvas, Animator) {
  var ctx = canvas.ctx;
  var circle;
  var animator;
  const SPEED = 0.04;

  this.init = function(student) {
    circle = {
      x: student.x,
      y: student.y,
      r: student.r
    };
    animator = new Animator(circle, animation);
    initAnimator(animator);
  };
  this.update = function() {
    return animator.update(SPEED);
  };
  this.draw = function(bgColor) {
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  };

  function initAnimator(animator) {
    animator.distance = {
      x: (canvas.width / 2 - animator.target.x),
      y: (canvas.height / 2 - animator.target.y),
      r: Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2 - animator.target.r
    };
  }

  function animation(target, start, t, animator) {
    var done;

    if( t > 1 ) {
      t = 1;
      done = true;
    }

    target.x = start.x + animator.distance.x * t;
    target.y = start.y + animator.distance.y * t;
    target.r = start.r + animator.distance.r * t;

    return done
  }
}]);
