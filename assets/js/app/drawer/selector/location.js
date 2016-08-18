modules.app

.factory('selector.Location', ['canvas', 'Animator', 'CursorChecker', function(canvas, Animator, CursorChecker) {
  var ctx = canvas.ctx;

  function Location(location, index, singleWidth) {
    Object.assign(this, location);
    this.x = singleWidth * index + singleWidth / 2;
    this.y = canvas.height / 2;
    this.progress = 0;
    this.animator = new Animator(this, animation, -index + Math.PI / 4);
    this.appeared = false;
    this.cursor = new CursorChecker(this, new CursorChecker.Functions.Circle());
  }
  Location.prototype.r = 100;
  Location.prototype.update = function() {
    if( !this.appeared ) this.appeared = this.animator.update(0.25);
    else {
      this.cursor.update();
      if( this.cursor.click ) return this;
    }
  };
  Location.prototype.draw = function(fadeoutProgress) {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.progress * 0.8 * (1 - fadeoutProgress);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r + (this.cursor.on ? 10 : 0), 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  const AMP = 220; // TODO canvasから計算
  const LMT = Math.PI * 3 / 2; // exclude OFFSET
  const OFFSET = Math.PI * 2 / 5;

  function animation(target, start, t, obj) {
    if( t - OFFSET < 0 ) {
      return false;
    } else if( t - OFFSET < LMT ) {
      target.y = start.y + Math.sin(-t+OFFSET) * AMP;
      target.progress = t / (LMT + OFFSET);
      return false;
    } else { // t - OFFEST >= LMT
      target.y = start.y + Math.sin(-LMT) * AMP;
      target.progress = 1;
      return true;
    }
  }

  return Location;
}]);
