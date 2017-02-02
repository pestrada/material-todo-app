angular.module('Items')

.controller('ItemsController', ['$scope', '$http', function ($scope, $http) {
  $scope.items = [];
  $scope.progress = 0;

  $scope.itemsEmpty = function () {
    return $scope.items.length == 0;
  };

  var loadData = function () {
    var listId = +location.href.split('/').pop();
    var url = 'http://localhost:3000/lists/' + listId + '.json'
    var config = { headers:  {'Accept': 'application/json;' } };

    $http.get(url).then(function(response) {
      $scope.items = response.data.items;
    });
  };

  var success = function (response) {
    if (response.data) $scope.lists.push(response.data);
  };

  var error = function (response) {
    $mdToast.showSimple('name ' + response.data.name[0]);
  };

  var sendPost = function (data) {
    var params = { name: data };
    var config = { headers:  {'Accept': 'application/json;' } };
    $http.post('http://localhost:3000/items.json', params, config).then(success, error);
  };

  $scope.newItem = function (ev) {
    var confirm = $mdDialog.prompt()
      .title('New item')
      .textContent('Enter the item name.')
      .placeholder('new item')
      .ariaLabel('New item')
      .initialValue('')
      .targetEvent(ev)
      .ok('Save')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      if (result) {
        sendPost(result);
      } else {
        $mdToast.showSimple('enter the item name.');
      }
    }, function() {

    });
  };

  loadData();

}]);