modules.app

.factory('canvas', ['$document', function($document) {
  var that = $document.find('canvas')[0];
  that.ctx = that.getContext('2d');

  return that;
}]);
