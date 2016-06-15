modules.app

.service('cursor', [function() {
  var that = this;

  this.onMouseMove = function(e) {
    that.x = e.clientX;
    that.y = e.clientY;
  };
}]);
