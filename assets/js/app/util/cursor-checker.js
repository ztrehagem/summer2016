modules.app

.factory('CursorChecker', ['cursor', function(cursor) {

  function CursorChecker(target, functions) {
    this.target = target;
    this.on = functions.on || angular.noop;
    this.click = functions.click || angular.noop;
  }

  CursorChecker.Circle = function() {};
  CursorChecker.Circle.prototype.on = function() {
    return Math.pow(this.target.x - cursor.x, 2) + Math.pow(this.target.y - cursor.y, 2) < Math.pow(this.target.r, 2);
  };

  return CursorChecker;
}]);
