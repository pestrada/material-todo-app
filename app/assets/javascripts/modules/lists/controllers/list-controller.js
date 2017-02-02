angular.module('Lists')

.controller('ListController', ['$scope', '$http', function ($scope, $http) {
  $scope.lists = [];
  $scope.progress = 0;

  $http.get('http://localhost:3000/lists.json').then(function(response) {
    $scope.lists = response.data;
  });

  $scope.listsEmpty = function () {
    return $scope.lists.length == 0;
  };

  $scope.newList = function () {
    
  };
}
]);