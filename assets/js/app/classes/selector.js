modules.app

.factory('selector', ['grower', function(grower) {
  var student;
  var state;
  const NONE = 0, GROW = 1, SHOW = 2, SHRINK = 3;

  const BG_COLOR = 'rgba(245, 245, 245, 0.9)';

  return {
    init: function(ctx, canvas, _student) {
      student = _student;
      grower.init(ctx, canvas, student);
      state = GROW;
    },
    update: function(ctx, canvas) {
      switch (state) {
        case GROW: {
          if( grower.update() ) state = SHOW;
          break;
        }
      }
    },
    draw: function(ctx, canvas) {
      grower.draw(BG_COLOR);
    }
  }
}]);
