angular.module('Items')

.controller('ItemsController', ['$scope', '$http', '$mdDialog', '$mdToast', function ($scope, $http, $mdDialog, $mdToast) {
  $scope.items = [];
  $scope.progress = 0;
  $scope.listId;

  $scope.itemsEmpty = function () {
    return $scope.items.length == 0;
  };

  var loadData = function () {
    $scope.listId = +location.href.split('/').pop();
    var url = 'http://localhost:3000/lists/' + $scope.listId + '.json'
    var config = { headers:  {'Accept': 'application/json;' } };

    $http.get(url).then(function(response) {
      $scope.items = response.data.items;
    });
  };

  var success = function (response) {
    if (response.data) $scope.items.push(response.data);
  };

  var error = function (response) {
    $mdToast.showSimple('name ' + response.data.name[0]);
  };

  var sendPost = function (item) {
    var config = { headers:  {'Accept': 'application/json;' } };
    var url = 'http://localhost:3000/lists/' + $scope.listId + '/items.json';
    $http.post(url, item, config).then(success, error);
  };

  var sendDelete = function (id) {
    var url = 'http://localhost:3000/lists/' + $scope.listId + '/items/' + id + '.json'
    var config = { headers:  {'Accept': 'application/json;' } };

    var deleted = function () {
      $mdToast.showSimple('item succesfully deleted!');
      loadData();
    };
    $http.delete(url, config).then(deleted, error);
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
        var item = {
          list_id: $scope.listId,
          name: result,
          completed: false,
          archived: false
        };
        sendPost(item);
      } else {
        $mdToast.showSimple('enter the item name.');
      }
    }, function() {

    });
  };

  $scope.deleteItem = function (ev, id) {
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete this item?')
      .textContent('The item will no longer be available.')
      .ariaLabel('delete item')
      .targetEvent(ev)
      .ok('Yes!')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      sendDelete(id);
    }, function () {

    });
  };

  loadData();

}]);