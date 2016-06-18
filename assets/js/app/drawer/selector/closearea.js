modules.app

.service('selector.closearea', ['canvas', 'Animator', function(canvas, Animator) {
  var ctx = canvas.ctx;

  this.init = function(student) {
    this.color = student.location.color;
    this.name = student.name;
    this.height = 0;
    this.animator = new Animator(this, animation);
  };

  this.update = function() {
    this.animator.update(0.05);
  };

  this.draw = function() {
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, canvas.width, this.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText(this.name, 200, this.height - 100);
    ctx.textAlign = 'right';
    ctx.fillText('close', canvas.width - 200, this.height - 100);
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
