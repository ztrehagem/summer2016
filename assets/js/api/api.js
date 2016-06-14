angular.module('api')

.factory('apis', ['$resource', function($resource) {
  var prefix = '/api-mock';

  var res = {
    studentList: $resource(prefix + '/student/list.json'),
    updateUser: $resource(prefix + '/student/update.json'),
    locationList: $resource(prefix + '/location/list.json')
  };

  return {
    getUsers: res.studentList.query,
    updateUser: res.updateUser.save,
    getLocations: res.locationList.query
  };
}]);
