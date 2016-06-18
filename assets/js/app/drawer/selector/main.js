modules.app

.service('selector.main', ['canvas', 'selector.locations', 'selector.closearea', 'Animator', function(canvas, locations, closearea, Animator) {
  var ctx = canvas.ctx;
  var student; // XXX いらない？
  var closearea;

  this.init = function(_student) {
    student = _student;
    locations.init();
    closearea.init(student);
  };
  this.update = function() {
    locations.update();
    closearea.update();
  };
  this.draw = function(bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    locations.draw();
    closearea.draw();
  };
}]);
