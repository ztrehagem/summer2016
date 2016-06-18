modules.app

.service('selector.shower', ['canvas', 'Locations', 'Animator', 'cursor', function(canvas, Locations, Animator, cursor) {
  var ctx = canvas.ctx;
  var student;
  var locations = [];

  function Location(location, index) {
    Object.assign(this, location);
    var width = canvas.width / locations.length;
    this.x = width * index + width / 2;
    this.y = canvas.height / 2;
    this.alpha = 0;
  }
  Location.prototype.r = 100;
  Location.prototype.update = function() {
    this.animator.update(0.25);
  };

  var closearea;

  this.init = function(_student) {
    student = _student;

    locations = Locations.get();
    locations = locations.map(function(location, index) {
      return new Location(location, index);
    });
    locations.forEach(function(location, index) {
      location.animator = new Animator(location, Animator.fn['selector.shower.location'], -index + Math.PI / 4);
    });

    closearea = {
      height: 0,
      update: function() {
        this.animator.update(0.1);
      }
    };
    closearea.animator = new Animator(closearea, Animator.fn['selector.shower.closearea']);
  };
  this.update = function() {
    locations.forEach(function(location) {
      location.update();
    });
    closearea.update();
  };
  this.draw = function(bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    locations.forEach(function(location) {
      ctx.fillStyle = location.color;
      ctx.globalAlpha = location.alpha * 0.8;
      ctx.beginPath();
      ctx.arc(location.x, location.y, location.r, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    });

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
