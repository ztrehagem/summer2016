modules.app

.service('selector.main', ['canvas', 'selector.locations', 'Animator', function(canvas, locations, Animator) {
  var ctx = canvas.ctx;
  var student;
  var closearea;

  this.init = function(_student) {
    student = _student;
    locations.init();

    closearea = {
      height: 0,
      update: function() {
        this.animator.update(0.1);
      }
    };
    closearea.animator = new Animator(closearea, Animator.fn['selector.shower.closearea']);
  };
  this.update = function() {
    locations.update();
    closearea.update();
  };
  this.draw = function(bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    locations.draw();

    ctx.globalAlpha = 0.8;
    ctx.fillStyle = student.location.color;
    ctx.fillRect(0, 0, canvas.width, closearea.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText(student.name, 200, closearea.height - 100);
    ctx.textAlign = 'right';
    ctx.fillText('close', canvas.width - 200, closearea.height - 100);
    ctx.textAlign = 'center';
  };
}]);
