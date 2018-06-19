angular.module("myApp")
  .controller("specialCrudController", function(vinDataInteraction) {
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

    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    };

    function addAlert(msg, type) {
      vm.alerts.push({
        msg: msg,
        type: type
      });
    };

    function receiveData() {
      vinDataInteraction.receiveData.then(function successCallback(response) {
        vm.vehicles = response.data.all;
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });
    };

    function deleteVehicle(vehicle, type) {
      vinDataInteraction.deleteVehicle(vehicle, type).then(function() {
        vm.receiveData();
      }, function(err) {
        console.log("error deleting value", err);
      });
    };

    function updateVehicle(vehicle, type) {
      vinDataInteraction.updateVehicle(vm.selected, vehicle, type).then(function() {
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
      if (vm.insertedYear && vm.insertedMake && vm.insertedEngine) {
        vinDataInteraction.insertSpecialVehicle(insertData).then(function(data) {
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

    function clearVehicle() {
      vm.insertedHarnessTypeOne = null;
      vm.insertedHarnessTypeTwo = null;
      vm.insertedYear = null;
      vm.insertedMake = null;
      vm.insertedEngine = null;
      vm.insertedAdapterType = null;
    }

    function checkEdit(vehicle, type) {
      if (type == 'special') {
        if (vehicle.make === vm.selected.make && vehicle.year === vm.selected.year && vehicle.engine === vm.selected.engine) {
          return 'editSpecial';
        } else return 'displaySpecial';
      } else {
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
