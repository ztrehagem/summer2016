modules.app

.service('selector.main', ['canvas', 'selector.locations', 'selector.closearea', 'Animator', function(canvas, locations, closearea, Animator) {
  var ctx = canvas.ctx;
  var student; // XXX いらない？
  var closearea;
  var select;
  var close;
  var fadeoutProgress;
  const FADEOUT_SPEED = 0.05;

  this.init = function(_student) {
    student = _student;
    locations.init();
    closearea.init(student);
    select = null;
    close = false;
    fadeoutProgress = 0;
  };
  this.update = function() {
    if( !close && !select ) {
      select = locations.update();
      close = closearea.update();
    } else {
      fadeoutProgress += FADEOUT_SPEED;
      if( fadeoutProgress >= 1 ) {
        fadeoutProgress = 1;
        return true;
      }
    }
  };
  this.draw = function(bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    locations.draw(fadeoutProgress);
    closearea.draw(fadeoutProgress);
  };
}]);
