modules.app

.service('selector.closearea', ['canvas', 'Animator', 'cursor', '$timeout', function(canvas, Animator, cursor, $timeout) {
  var ctx = canvas.ctx;
  var that = this;

  const CLICK_DELAY = 800;

  this.init = function(student) {
    this.color = student.location.color;
    this.name = student.name;
    this.height = 0;
    this.animator = new Animator(this, animation);
    this.appeared = false;
    this.on = false;
    this.timer = null;
    this.close = false;
  };

  this.update = function() {
    if( !this.appeared ) this.appeared = this.animator.update(0.05);
    this.on = cursor.y < this.height;
    if( this.on ) {
      if( !this.timer ) {
        this.timer = $timeout(function() {
          that.close = true;
        }, CLICK_DELAY);
      }
    } else {
      if( this.timer ) {
        $timeout.cancel(this.timer);
        this.timer = null;
      }
    }

    return this.close;
  };

  this.draw = function(fadeoutProgress) {
    ctx.globalAlpha = (this.on ? 0.6 : 0.8) * (1 - fadeoutProgress);
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, canvas.width, this.height);
    ctx.globalAlpha = 1 - fadeoutProgress;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText(this.name, 200, this.height - 90);
    ctx.textAlign = 'right';
    ctx.fillText('close', canvas.width - 200, this.height - 90);
    ctx.textAlign = 'center';
  };

  const LMT = 220;

  function animation(target, start, t, obj) {
    if( t >= 1 ) {
      target.height = LMT;
      return true;
    }
    target.height = start.height + t * LMT;
  }
}]);
