angular.module("myApp", ['ui.bootstrap', 'ngFileUpload']);

angular.module("myApp")
  .controller("crudController", function($http) {
    var vm = this;
    vm.vehicles;
    vm.specialVehicles;
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
    vm.tabs = [{
        title: 'Normal Vehicles',
        content: '/tabOne.html'
      },
      {
        title: 'Special Vehicles',
        content: '/tabTwo.html'
      }
    ];
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
        vm.vehicles = response.data.all;
        vm.specialVehicles = response.data.special;
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });
    };

    function deleteVehicle(vehicle, type) {
      var url = '/crud/delete';
      if(type){
        url = url + type;
      }
      $http({
        method: 'POST',
        url: url,
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

    function updateVehicle(vehicle, type) {
      var url = '/crud/update';
      if(type){
        url = url + type;
      }
      vm.updateData = {
        harnessTypeOne: vehicle.harnessTypeOne,
        harnessTypeTwo: vehicle.harnessTypeTwo,
        adapterType: vehicle.adapterType,
        yearId: vm.selected.year,
        makeId: vm.selected.make,
        engineId: vm.selected.engine
      }
      $http({
        method: 'POST',
        url: url,
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

    function insertVehicle() {
      var insertData = {
        harnessTypeOne: vm.insertedHarnessTypeOne,
        harnessTypeTwo: vm.insertedHarnessTypeTwo,
        year: vm.insertedYear,
        make: vm.insertedMake,
        adapterType: vm.insertedAdapterType,
        engine: vm.insertedEngine
      }
      if (vm.tabIndex) {
        if (vm.insertedEngine && vm.insertedYear && vm.insertedMake) {
          console.log('special');
          $http({
            method: 'POST',
            url: '/crud/insert/special',
            data: insertData,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          }).then(function(data) {
            if (JSON.stringify(data.data.error) == JSON.stringify({
                errno: 19,
                code: "SQLITE_CONSTRAINT"
              })) {
              vm.addAlert('vehicle is already in database', 'danger')
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
      } else {
        if (vm.insertedYear && vm.insertedMake) {
          console.log('normal');
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
              vm.addAlert('vehicle is already in database', 'danger')
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
    }

    function clearVehicle() {
      vm.insertedHarnessTypeOne = null;
      vm.insertedHarnessTypeTwo = null;
      vm.insertedYear = null;
      vm.insertedMake = null;
      vm.insertedEngine = null;
      vm.insertedAdapterType = null;
    }

    function checkEdit(vehicle, type) {
      if(type == 'special'){
        if (vehicle.make === vm.selected.make && vehicle.year === vm.selected.year && vehicle.engine === vm.selected.engine) {
          return 'editSpecial';
        } else return 'displaySpecial';
      }else{
        if (vehicle.make === vm.selected.make && vehicle.year === vm.selected.year) {
          return 'edit';
        } else return 'display';
      }
    };

    function reset() {
      vm.selected = {};
      vm.receiveData();
    };

    function editVehicle(vehicle) {
      vm.selected = angular.copy(vehicle);
    };
  });
