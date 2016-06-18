modules.app

.factory('CursorChecker', ['canvas', 'cursor', '$timeout', function(canvas, cursor, $timeout) {

  const CLICK_DELAY = 800;

  function CursorChecker(target, functions) {
    this.target = target;
    this.functions = functions;
  }
  CursorChecker.prototype.update = function(reset) {
    this.on = (this.functions.on || angular.noop)(this);
    this.click = (this.functions.click || angular.noop)(this, reset);
    if( this.click ) console.log('click');
  };

  CursorChecker.Functions = function() {
  };
  CursorChecker.Functions.prototype.click = function(that, reset) {
    // TODO refactoring

    if( reset ) {
      doReset();
      return;
    }

    if( that.on ) {
      if( !that.timer ) {
        that.timer = $timeout(function() {
          that.clicked = true;
          that.timer = null;
        }, CLICK_DELAY);
      }
    } else {
      doReset();
    }

    if( that.clicked ) {
      doReset();
      return true;
    }

    function doReset() {
      if( that.timer ) {
        $timeout.cancel(that.timer);
        that.timer = null;
      }
      that.clicked = false;
    }
  };
  CursorChecker.Functions.Circle = function() {
    this.click = CursorChecker.Functions.prototype.click;
  };
  CursorChecker.Functions.Circle.prototype.on = function(that) {
    return Math.pow(that.target.x - cursor.x, 2) + Math.pow(that.target.y - cursor.y, 2) < Math.pow(that.target.r, 2);
  };
  CursorChecker.Functions.Rect = function() {
    this.click = CursorChecker.Functions.prototype.click;
  };
  CursorChecker.Functions.Rect.prototype.on = function(that) {
    // TODO RectClassを作ってプロパティの存在を保証する
    var target = {};
    target.x = that.target.x || 0;
    target.width = that.target.width || target.x + canvas.width;
    target.y = that.target.y || 0;
    target.height = that.target.height || target.y + canvas.height;
    return cursor.x >= target.x && cursor.x < (target.x + target.width) && cursor.y >= target.y && cursor.y < (target.y + target.height);
  };

  return CursorChecker;
}]);
