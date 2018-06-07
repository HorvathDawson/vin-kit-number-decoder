angular.module("myApp", ['ui.bootstrap']);

angular.module("myApp")
  .controller("crudController", function($scope, $http, $sce) {
    $scope.vehicles;
    $scope.selected = {};

    $scope.receiveData = function() {
      $http({
        method: 'GET',
        url: 'http://localhost:8000/crud/loadAll'
      }).then(function successCallback(response) {
        $scope.vehicles = response.data;
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });
    };
    $scope.receiveData();

    $scope.deleteVehicle = function(vehicle) {
      $http({
        method: 'POST',
        url: 'http://localhost:8000/crud/delete',
        data: vehicle,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function(){
        $scope.receiveData();
      }, function(err){
        console.log("error deleting value", err);
      });
    };

    $scope.updateVehicle = function(vehicle) {
      $scope.updateData = {
        harnessType: vehicle.harnessType,
        yearId: $scope.selected.year,
        makeId: $scope.selected.make
      }
      $http({
        method: 'POST',
        url: 'http://localhost:8000/crud/update',
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

    $scope.checkEdit = function(vehicle) {
      if (vehicle.make === $scope.selected.make && vehicle.year === $scope.selected.year) {
        return 'edit';
      } else return 'display';
    };

    $scope.reset = function() {
      $scope.selected = {};
      $scope.receiveData();
    };

    $scope.editVehicle = function(vehicle) {
      $scope.selected = angular.copy(vehicle);
    };
  });
