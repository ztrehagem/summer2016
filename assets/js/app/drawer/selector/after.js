modules.app

.service('selector.after', ['canvas', 'Animator', function(canvas, Animator) {
  var ctx = canvas.ctx;
  var animator;
  const SPEED = 0.04;

  this.init = function() {
    this.alpha = 1;
    animator = new Animator(this, animation);
  };

  this.update = function() {
    return animator.update(SPEED);
  };

  this.draw = function(bgColor) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
  };

  function animation(target, start, t, obj) {
    target.alpha = (1 - t);
    if( target.alpha < 0 ) {
      target.alpha = 0;
      return true;
    }
  }
}]);
