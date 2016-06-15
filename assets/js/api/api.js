modules.api

.factory('apis', ['$resource', function($resource) {
  var prefix = '/api-mock';

  var res = {
    studentList: $resource(prefix + '/student/list.json'),
    updateUser: $resource(prefix + '/student/update.json'),
    locationList: $resource(prefix + '/location/list.json')
  };

  return {
    getStudentList: res.studentList.query,
    updateStudent: res.updateUser.save,
    getLocations: res.locationList.query
  };
}]);
