var modules = {};

modules.api = angular.module('api', [
  'ngResource'
]);

modules.app = angular.module('app', [
  'api'
]);
