angular.module('app')

.controller('testController', ['apis', function(apis) {
  var that = this;

  this.list = [];

  apis.getLocations(function(list) {
    that.list = list;
  });
}]);
