modules.app

.service('selector.main', ['canvas', 'selector.locations', 'selector.closearea', 'selector.selected', 'Animator', function(canvas, locations, closearea, selected, Animator) {
  var ctx = canvas.ctx;
  var student; // XXX いらない？
  var selectedLocation;
  var close;
  var animator;
  const FADEOUT_SPEED = 0.05;

  this.init = function(_student) {
    student = _student;
    locations.init();
    closearea.init(student);
    selectedLocation = null;
    close = false;
    animator = new Animator({}, animation);
  };
  this.update = function() {
    if( close ) {
      return animator.update(FADEOUT_SPEED);
    } else if( selectedLocation ) {
      close = selected.update();
    } else {
      selectedLocation = locations.update();
      close = closearea.update();

      if( selectedLocation ) {
        selected.init(selectedLocation);
      }
    }
  };
  this.draw = function(bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    locations.draw(animator.t);
    closearea.draw(animator.t);
    if( selectedLocation ) {
      selected.draw(animator.t);
    }
  };

  function animation(target, start, t, animator) {
    if( t > 1 ) {
      t = 1;
      return true;
    }
  }
}]);
