modules.app

.service('selector', ['canvas', 'selector.before', 'selector.main', 'selector.after', function(canvas, before, main, after) {
  var student;
  var state;
  const NONE = 0, BEFORE = 1, MAIN = 2, AFTER = 3;

  const BG_COLOR = 'rgba(245, 245, 245, 0.9)';

  this.init = function(_student) {
    student = _student;
    before.init(student);
    state = BEFORE;
  };
  this.update = function() {
    switch (state) {
      case BEFORE: {
        if( before.update() ) {
          main.init(student);
          state = MAIN;
        }
        break;
      }
      case MAIN: {
        if( main.update() ) {
          after.init();
          state = AFTER;
        }
        break;
      }
      case AFTER: {
        if( after.update() ) {
          return true;
        }
        break;
      }
    }
  };
  this.draw = function() {
    switch (state) {
      case BEFORE: {
        before.draw(BG_COLOR);
        break;
      }
      case MAIN: {
        main.draw(BG_COLOR);
        break;
      }
      case AFTER: {
        after.draw(BG_COLOR);
        break;
      }
    }
  }
}]);
