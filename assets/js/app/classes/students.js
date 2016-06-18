modules.app

.service('students', ['Student', 'apis', function(Student, apis) {
  var students = [];
  var open;

  this.init = function() {
    apis.getStudentList(function(list) {
      list.forEach(function(student_raw) {
        students.push(new Student(student_raw));
      });
    });
  };

  // TODO リファクタリング(openとか)
  this.update = function(_open) {
    students.forEach(function(me) {
      // TODO ここ、下のループ内に入れ込める
      students.forEach(function(target) {
        me.calcEachResistance(target); // お互いにぶつかった時の反発
      });
    });

    open = _open;

    students.forEach(function(student) {
      open = open || student.checkMouse(open);
      student.update(open);
    });

    return open;
  };

  this.draw = function() {
    students.forEach(function(student) {
      student.draw(open);
    });
  };
}]);
