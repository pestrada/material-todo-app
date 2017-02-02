angular.module('Lists')

.controller('ListController', ['$scope', '$http', '$mdDialog', function ($scope, $http, $mdDialog) {
  $scope.lists = [];
  $scope.progress = 0;

  var loadData = function () {
    $http.get('http://localhost:3000/lists.json').then(function(response) {
      $scope.lists = response.data;
    });
  };

  var sendPost = function (data) {
    var params = { name: data };
    var config = { headers:  {'Accept': 'application/json;' } };
    $http.post('http://localhost:3000/lists.json', params, config).then(function(response) {
      if (response.data) $scope.lists.push(response.data);
    });
  };

  $scope.listsEmpty = function () {
    return $scope.lists.length == 0;
  };

  $scope.newList = function (ev) {
    var confirm = $mdDialog.prompt()
      .title('Enter the list name')
      .textContent('What would you like to acomplish?')
      .placeholder('learn something new')
      .ariaLabel('List name')
      .initialValue('')
      .targetEvent(ev)
      .ok('Save')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      if (result) {
        sendPost(result);
      }
    }, function() {
      
    });
  };

  loadData();
}
]);