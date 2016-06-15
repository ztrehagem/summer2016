modules.app

.factory('drawer', ['Students', function(Students) {
  var students;

  function clear(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return {
    init: function(ctx, canvas) {
      students = new Students(ctx, canvas);
    },
    update: function(ctx, canvas) {

      // TODO onResize でやる
      ctx.font = "28px 'Hiragino Kaku Gothic ProN'";
      ctx.textAlign = 'center';

      students.update(ctx, canvas);
    },
    draw: function(ctx, canvas) {
      clear(ctx, canvas);
      students.draw(ctx, canvas);
    }
  }
}]);
