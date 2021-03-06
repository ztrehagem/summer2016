modules.app

.service('selector.closearea', ['canvas', 'Animator', 'CursorChecker', '$timeout', function(canvas, Animator, CursorChecker, $timeout) {
  var ctx = canvas.ctx;
  var that = this;

  this.init = function(student) {
    this.color = student.location.color;
    this.name = student.name;
    this.height = 0;
    this.animator = new Animator(this, animation);
    this.appeared = false;
    this.cursor = new CursorChecker(this, new CursorChecker.Functions.Rect());
  };

  this.update = function() {
    if( !this.appeared ) this.appeared = this.animator.update(0.05);
    else {
      this.cursor.update();
      return this.cursor.click;
    }
  };

  this.draw = function(fadeoutProgress) {
    ctx.globalAlpha = (this.cursor.on ? 0.6 : 0.8) * (1 - fadeoutProgress);
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
