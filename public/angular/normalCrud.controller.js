
angular.module("myApp")
  .controller("normalCrudController", function(vinDataInteraction) {
    var vm = this;
    vm.vehicles;
    vm.selected = {};
    vm.alerts = [];
    vm.closeAlert = closeAlert;
    vm.addAlert = addAlert;
    vm.receiveData = receiveData;
    vm.deleteVehicle = deleteVehicle;
    vm.updateVehicle = updateVehicle;
    vm.insertVehicle = insertVehicle;
    vm.clearVehicle = clearVehicle;
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
      vinDataInteraction.receiveNormalData().then(function successCallback(response) {
        vm.vehicles = response.data;
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
      vinDataInteraction.updateVehicle(vehicle, type).then(function() {
        vehicle.edit = null;
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
        if (vm.insertedYear && vm.insertedMake) {
          vinDataInteraction.insertVehicle(insertData).then(function(data) {
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

    function reset(vehicle) {
      vm.receiveData();
      vehicle.edit = null;
      vehicle.popover = false;
    };

    function editVehicle(vehicle) {
      vehicle.edit = true;
    };
  });
