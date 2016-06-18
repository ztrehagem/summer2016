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

  return Animator;
}]);
