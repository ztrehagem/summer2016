modules.app

.factory('Animator', [function() {

  function Animator(target, fn, t0) {
    this.target = target;
    this.start = Object.assign({}, target);
    this.fn = fn || angular.noop;
    this.t = t0 || 0;
  };

  Animator.prototype.update = function(dt) {
    return this.fn(this.target, this.start, this.t += dt, this);
  };

  Animator.fn = {
    'selector.shower': function(target, start, t, obj) {
      obj.AMP = obj.AMP || 180; // TODO canvasから計算
      obj.LMT = obj.LMT || Math.PI * 3 / 2;
      obj.OFFSET = obj.OFFSET || Math.PI * 2 / 5;

      t -= obj.OFFSET;
      if( t < 0 ) return;

      if( t >= obj.LMT ) {
        target.y = start.y + Math.sin(-obj.LMT) * obj.AMP;
        target.alpha = 1;
        return true;
      }
      target.y = start.y + Math.sin(-t) * obj.AMP;
      target.alpha = t / (obj.LMT + obj.OFFSET);
    }
  };

  return Animator;
}]);
