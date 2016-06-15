modules.app

.factory('Students', ['Student', 'apis', function(Student, apis) {

  function Students(ctx, canvas) {
    var that = this;

    this.students = [];

    apis.getStudentList(function(list) {
      list.forEach(function(student) {
        that.students.push(new Student(student.id, student.name, student.location, ctx, canvas));
      });
    });
  };

  Students.prototype.update = function(ctx, canvas) {
    var that = this;

    this.students.forEach(function(me) {
      that.students.forEach(function(target) {
        me.calcEachResistance(target); // お互いにぶつかった時の反発
      });
    });

    this.students.forEach(function(student) {
      student.update(ctx, canvas);
    });
  };

  Students.prototype.draw = function(ctx, canvas) {
    this.students.forEach(function(student) {
      student.draw(ctx, canvas);
    });
  };

  return Students;
}]);
