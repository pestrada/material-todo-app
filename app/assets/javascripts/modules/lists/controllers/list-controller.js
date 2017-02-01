angular.module('Lists')

.controller('ListController', ['$scope', '$http', function ($scope, $http) {
  $scope.lists = [];

  $http.get('http://localhost:3000/lists.json').then(function(response) {
    $scope.lists = response.data;
  });
}
]);