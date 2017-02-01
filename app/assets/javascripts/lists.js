angular.module('Lists')

.controller('ListController', ['$scope', '$http', function ($scope, $http) {
  $scope.lists = [1, 2, 3];
}
]);