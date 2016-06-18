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
    open = _open;

    students.forEach(function(student) {
      students.forEach(function(target) {
        student.calcEachResistance(target); // お互いにぶつかった時の反発
      });
      open = open || student.checkMouse(open); // XXX student.checkMouseが実行されない場合の整合性s
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
