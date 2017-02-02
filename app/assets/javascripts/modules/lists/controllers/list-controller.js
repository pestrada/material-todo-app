angular.module('Lists')

.controller('ListController', ['$scope', '$http', '$mdDialog', '$mdToast', function ($scope, $http, $mdDialog, $mdToast) {
  $scope.lists = [];
  $scope.progress = 0;

  var loadData = function () {
    $http.get('http://localhost:3000/lists.json').then(function(response) {
      $scope.lists = response.data;
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
    $http.post('http://localhost:3000/lists.json', params, config).then(success, error);
  };

  var sendPatch = function (listId, data) {
    var params = { name: data };
    var url = 'http://localhost:3000/lists/' + listId + '.json'
    var config = { headers:  {'Accept': 'application/json;' } };

    var patched = function () {
      $mdToast.showSimple('list succesfully deleted!');
      loadData();
    };
    $http.patch(url, params, config).then(patched, error);
  };

  var sendDelete = function (listId) {
    var url = 'http://localhost:3000/lists/' + listId + '.json'
    var config = { headers:  {'Accept': 'application/json;' } };

    var deleted = function () {
      $mdToast.showSimple('list succesfully deleted!');
      loadData();
    };
    $http.delete(url, config).then(deleted, error);
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
      } else {
        $mdToast.showSimple('enter the list name.');
      }
    }, function() {

    });
  };

  $scope.deleteList = function (ev, listId) {
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete this list?')
      .textContent('The list will no longer be available.')
      .ariaLabel('delete list')
      .targetEvent(ev)
      .ok('Yes!')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      sendDelete(listId);
    }, function () {

    });
  };

  $scope.editList = function (ev, listId, listName) {
    location.href = '/lists/' + listId;
    // var confirm = $mdDialog.prompt()
    //   .title('List')
    //   .textContent('Editing list')
    //   .placeholder('new name')
    //   .ariaLabel('List name')
    //   .initialValue(listName)
    //   .targetEvent(ev)
    //   .ok('Save')
    //   .cancel('Cancel');

    // $mdDialog.show(confirm).then(function(result) {
    //   if (result) {
    //     sendPatch(listId, result);
    //   } else {
    //     $mdToast.showSimple('enter the list name.');
    //   }
    // }, function() {

    // });
  };

  loadData();
}
]);