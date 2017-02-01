angular.module('Items')

.controller('ItemsController', ['$scope', '$http', function ($scope, $http) {
  $scope.items = [];

  $http.get('http://localhost:3000/', config).then(function(response) {
    $scope.items = response.data['data'];
  });
}
]);