modules.app

.service('selector.main', ['canvas', 'selector.locations', 'selector.closearea', 'Animator', function(canvas, locations, closearea, Animator) {
  var ctx = canvas.ctx;
  var student; // XXX いらない？
  var closearea;
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
    if( !close && !selectedLocation ) {
      selectedLocation = locations.update();
      close = closearea.update();

      if( selectedLocation ) {
        // select.init(selectedLocation);
      }

    } else if( selectedLocation ) {
      // close = select.update();

    } else if( close ) {
      return animator.update(FADEOUT_SPEED);
    }
  };
  this.draw = function(bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    locations.draw(animator.t);
    closearea.draw(animator.t);
    if( selectedLocation ) {
      // select.draw(animator.t);
    }
  };

  function animation(target, start, t, animator) {
    if( t > 1 ) {
      t = 1;
      return true;
    }
  }
}]);
