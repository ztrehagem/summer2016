modules.app

.factory('selector.shower', ['Locations', function(Locations) {
  var ctx, canvas, student;
  var locations = [];

  function Location(location, index) {
    Object.assign(this, location);
    var width = canvas.width / locations.length;
    this.x = width * index + width / 2;
    this.y = canvas.height / 2;
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
    },
    update: function() {
    },
    draw: function(bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      locations.forEach(function(location) {
        ctx.fillStyle = location.color;
        ctx.beginPath();
        ctx.arc(location.x, location.y, location.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
      });
    }
  };
}]);
