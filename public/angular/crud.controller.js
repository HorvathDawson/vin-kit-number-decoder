angular.module("myApp", ['ui.bootstrap', 'ngFileUpload']);

angular.module("myApp")
  .controller("crudController", function($scope, $http) {
    $scope.vehicles;
    $scope.selected = {};

    $scope.fileUpload = function() {
      var file = $scope.spreadsheet;
      var payload = new FormData();
      payload.append('file', file);

      for (var key of payload.entries()) {
        console.log(key[0] + ', ' + key[1]);
      }
      /*
      $http({
        method: 'POST',
        url: 'http://localhost:8000/file/upload',
        data: payload,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }) */
      $http.post('http://localhost:8000/file/upload',payload, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
      })
      .then(function(data) {
        console.log(data);
        $scope.receiveData();
      }, function(err) {
        console.log("error adding value", err);
      });
    };

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
      }).then(function() {
        $scope.receiveData();
      }, function(err) {
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
      }).then(function() {
        $scope.selected = {};
        $scope.receiveData();
      }, function(err) {
        console.log("error updating value", err);
      });
    };
    $scope.insertVehicle = function() {
      var updateData = {
        harnessType: this.insertedHarnessType,
        year: this.insertedYear,
        make: this.insertedMake
      }
      $http({
        method: 'POST',
        url: 'http://localhost:8000/crud/insert',
        data: updateData,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function() {
        $scope.receiveData();
      }, function(err) {
        console.log("error adding value", err);
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
