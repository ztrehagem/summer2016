modules.app

.service('Locations', ['apis', function(apis) {
  var locations;

  // XXX ここ、configか何かでpromiseにしないといつか死ぬ
  apis.getLocations(function(list) {
    locations = list;
  });

  this.get = function() {
    return locations;
  };
  this.findById = function(id) {
    var ret = null;
    locations.forEach(function(location) {
      if( location.id == id ) {
        ret = location;
        return false;
      }
    });
    return ret;
  };
}]);
