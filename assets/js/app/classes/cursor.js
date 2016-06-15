modules.app

.service('cursor', [function() {
  var that = this;

  this.onMouseMove = function(e) {
    that.x = e.clientX - 30;
    that.y = e.clientY - 30;
  };
}]);
