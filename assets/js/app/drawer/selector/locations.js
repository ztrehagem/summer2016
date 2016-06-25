modules.app

.service('selector.locations', ['canvas', 'Locations', 'selector.Location', function(canvas, Locations, Location) {
  var locations = [];

  this.init = function() {
    locations = Locations.get();

    var singleWidth = canvas.width / locations.length;

    locations = locations.map(function(location, index) {
      return new Location(location, index, singleWidth);
    });
  };

  this.update = function() {
    var ret = null;
    locations.forEach(function(location) {
      ret = location.update() || ret;
    });
    return ret;
  };

  this.draw = function(fadeoutProgress) {
    locations.forEach(function(location) {
      location.draw(fadeoutProgress);
    });
  };
}]);
