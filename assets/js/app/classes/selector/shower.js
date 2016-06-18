modules.app

.factory('selector.shower', ['Locations', 'Animator', function(Locations, Animator) {
  var ctx, canvas, student;
  var locations = [];

  function Location(location, index) {
    Object.assign(this, location);
    var width = canvas.width / locations.length;
    this.x = width * index + width / 2;
    this.y = canvas.height / 2;
    this.alpha = 0;
  }
  Location.prototype.r = 60;

  return {
    init: function(_ctx, _canvas, _student) {
      ctx = _ctx;
      canvas = _canvas;
      student = _student;

      locations = Locations.get();
      locations = locations.map(function(location, index) {
        return new Location(location, index);
      });
      locations.forEach(function(location, index) {
        location.animator = new Animator(location, Animator.fn['selector.shower'], -index + Math.PI / 4);
      });
    },
    update: function() {
      locations.forEach(function(location) {
        location.animator.update(0.2);
      });
    },
    draw: function(bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      locations.forEach(function(location) {
        ctx.fillStyle = location.color;
        ctx.globalAlpha = location.alpha;
        ctx.beginPath();
        ctx.arc(location.x, location.y, location.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }
  };
}]);
