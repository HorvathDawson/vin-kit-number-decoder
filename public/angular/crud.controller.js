angular.module("myApp", ['ui.bootstrap', 'ngFileUpload']);

angular.module("myApp")
  .controller("crudController", function($http) {
    var vm = this;
    vm.vehicles;
    vm.selected = {};
    vm.alerts = [];
    vm.closeAlert = closeAlert;
    vm.addAlert = addAlert;
    vm.fileUpload = fileUpload;
    vm.receiveData = receiveData;
    vm.deleteVehicle = deleteVehicle;
    vm.updateVehicle = updateVehicle;
    vm.insertVehicle = insertVehicle;
    vm.clearVehicle = clearVehicle;
    vm.checkEdit = checkEdit;
    vm.reset = reset;
    vm.editVehicle = editVehicle;
    vm.receiveData();

    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    };

    function addAlert(msg, type) {
      vm.alerts.push({
        msg: msg,
        type: type
      });
    };

    function fileUpload() {
      var file = vm.spreadsheet;
      var payload = new FormData();
      payload.append('file', file);
      $http.post('/file/upload', payload, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        })
        .then(function(data) {
          XLSX.writeFile(data.data, "vinInformation.xlsx");
        }, function(err) {
          console.log("error adding value", err);
        });
    };

    function receiveData() {
      $http({
        method: 'GET',
        url: '/crud/loadAll'
      }).then(function successCallback(response) {
        vm.vehicles = response.data;
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });
    };

    function deleteVehicle(vehicle) {
      $http({
        method: 'POST',
        url: '/crud/delete',
        data: vehicle,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function() {
        vm.receiveData();
      }, function(err) {
        console.log("error deleting value", err);
      });
    };

    function updateVehicle(vehicle) {
      vm.updateData = {
        harnessTypeOne: vehicle.harnessTypeOne,
        harnessTypeTwo: vehicle.harnessTypeTwo,
        yearId: vm.selected.year,
        makeId: vm.selected.make
      }
      $http({
        method: 'POST',
        url: '/crud/update',
        data: vm.updateData,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function() {
        vm.selected = {};
        vm.receiveData();
      }, function(err) {
        console.log("error updating value", err);
      });
    };
    function clearVehicle() {
        vm.insertedHarnessTypeOne = null;
        vm.insertedHarnessTypeTwo = null;
        vm.insertedYear = null;
        vm.insertedMake = null;
      }
    function insertVehicle() {
      var insertData = {
        harnessTypeOne: vm.insertedHarnessTypeOne,
        harnessTypeTwo: vm.insertedHarnessTypeTwo,
        year: vm.insertedYear,
        make: vm.insertedMake
      }
      if (vm.insertedMake && vm.insertedYear) {
        $http({
          method: 'POST',
          url: '/crud/insert',
          data: insertData,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then(function(data) {
          if (JSON.stringify(data.data.error) == JSON.stringify({
              errno: 19,
              code: "SQLITE_CONSTRAINT"
            })) {
            vm.addAlert('vehicle make and year is already in database', 'danger')
          } else {
            vm.addAlert('you have successfully added a vehicle', 'success')
          }
          vm.receiveData();
        }, function(err) {
          console.log("error adding value", err);
        });
      } else {
        vm.addAlert('missing field', 'danger');
      }
    }

    function checkEdit(vehicle) {
      if (vehicle.make === vm.selected.make && vehicle.year === vm.selected.year) {
        return 'edit';
      } else return 'display';
    };

    function reset() {
      vm.selected = {};
      vm.receiveData();
    };

    function editVehicle(vehicle) {
      vm.selected = angular.copy(vehicle);
    };
  });
