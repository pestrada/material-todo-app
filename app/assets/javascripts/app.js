angular.module('Lists', []);
angular.module('Items', []);

angular.module('todoApp', [
  'Lists',
  'Items',
  'ngMaterial'
]);