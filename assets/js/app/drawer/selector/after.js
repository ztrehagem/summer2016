modules.app

.service('selector.after', ['canvas', function(canvas) {
  var ctx = canvas.ctx;
  var alpha;
  const SPEED = 0.04;

  this.init = function() {
    alpha = 1;
  };

  this.update = function() {
    if( (alpha -= SPEED) <= 0 ) {
      alpha = 0;
      return true;
    }
  };

  this.draw = function(bgColor) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
  };
}]);
