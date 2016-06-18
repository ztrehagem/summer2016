modules.app

.service('parent', ['canvas', 'students', 'selector', function(canvas, students, selector) {
  var ctx = canvas.ctx;
  var open;

  this.init = function() {
    students.init();
  };
  this.update = function() {
    // TODO onResize でやる？否、毎フレーム必要か
    ctx.font = "50px 'Hiragino Kaku Gothic ProN'";
    ctx.textAlign = 'center';

    if( !open ) {
      open = students.update();
      if( open ) selector.init(open);
    }
    else {
      students.update(open);
      open = !selector.update();
    }
  };
  this.draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    students.draw();
    if( open ) selector.draw();
  };
}]);
