modules.app

.factory('drawer', ['Students', 'selector', function(Students, selector) {
  var students;
  var open;

  return {
    init: function(ctx, canvas) {
      students = new Students(ctx, canvas);
    },
    update: function(ctx, canvas) {

      // TODO onResize でやる
      ctx.font = "24px 'Hiragino Kaku Gothic ProN'";
      ctx.textAlign = 'center';

      if( !open ) {
        open = students.update(ctx, canvas);
        if( open ) selector.init(ctx, canvas, open);
      }
      else {
        students.update(ctx, canvas);
        open = !selector.update(ctx, canvas);
      }
    },
    draw: function(ctx, canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      students.draw(ctx, canvas);
      if( open ) selector.draw(ctx, canvas);
    }
  }
}]);
