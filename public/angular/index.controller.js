angular.module("myApp", ['ui.bootstrap','file-model']);

angular.module("myApp")
  .controller("mainController", function($scope, $http) {
    $scope.trucks;
    $scope.selected = {};

    $scope.receiveData = function() {
      $http({
        method: 'GET',
        url: 'http://localhost:8000/getAllData'
      }).then(function successCallback(response) {
        $scope.trucks = response.data;
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
    };
    $scope.receiveData();

    $scope.deleteTruck = function(truck) {
      $http({
        method: 'POST',
        url: 'http://localhost:8000/delete/submit',
        data: truck,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function(){
        $scope.receiveData();
      }, function(err){
        console.log("error deleting value", err);
      });
    };

    $scope.updateTruck = function(truck) {
      $scope.updateData = {
        harnessType: truck.harnessType,
        yearId: $scope.selected.year,
        makeId: $scope.selected.make
      }
      $http({
        method: 'POST',
        url: 'http://localhost:8000/update/submit',
        data: $scope.updateData,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function(){
        $scope.selected = {};
        $scope.receiveData();
      }, function(err){
        console.log("error updating value", err);
      });
    };

    $scope.checkEdit = function(truck) {
      if (truck.make === $scope.selected.make && truck.year === $scope.selected.year) {
        return 'edit';
      } else return 'display';
    };

    $scope.reset = function() {
      $scope.selected = {};
      $scope.receiveData();
    };

    $scope.editTruck = function(truck) {
      $scope.selected = angular.copy(truck);
    };
    /*
    $scope.inserttruck = function() {
      $scope.insertData = {
        year: $scope.year,
        make: $scope.make,
        harnessType: $scope.harnessType
      }
      $http({
        method: 'POST',
        url: 'http://localhost:8000/insert/submit',
        data: insertData,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }; */

  });
