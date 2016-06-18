modules.app

.factory('selector', ['canvas', 'selector.grower', 'selector.shower', function(canvas, grower, shower) {
  var ctx = canvas.ctx;
  var student;
  var state;
  const NONE = 0, GROW = 1, SHOW = 2, SHRINK = 3;

  const BG_COLOR = 'rgba(245, 245, 245, 0.9)';

  return {
    init: function(_student) {
      student = _student;
      grower.init(student);
      state = GROW;
    },
    update: function() {
      switch (state) {
        case GROW: {
          if( grower.update() ) {
            shower.init(student);
            state = SHOW;
          }
          break;
        }
        case SHOW: {
          shower.update();
          break;
        }
      }
    },
    draw: function() {
      switch (state) {
        case GROW: {
          grower.draw(BG_COLOR);
          break;
        }
        case SHOW: {
          shower.draw(BG_COLOR);
          break;
        }
      }
    }
  }
}]);
