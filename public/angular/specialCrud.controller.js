angular.module("myApp")
  .controller("specialCrudController", function(dataInteraction) {
    var vm = this;
    vm.vehicles;
    vm.alerts = [];
    vm.closeAlert = closeAlert;
    vm.addAlert = addAlert;
    vm.receiveData = receiveData;
    vm.deleteVehicle = deleteVehicle;
    vm.updateVehicle = updateVehicle;
    vm.insertVehicle = insertVehicle;
    vm.clearForm = clearForm;
    vm.reset = reset;
    vm.edit = edit;
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
      dataInteraction.receiveSpecialData().then(function successCallback(response) {
        vm.vehicles = response.data;
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });
    };

    function deleteVehicle(vehicle, type) {
      dataInteraction.deleteVehicle(vehicle, type).then(function() {
        vm.receiveData();
      }, function(err) {
        console.log("error deleting value", err);
      });
    };

    function updateVehicle(vehicle, type) {
      dataInteraction.updateVehicle(vehicle, type).then(function() {
        vehicle.edit = null;
        vm.receiveData();
      }, function(err) {
        console.log("error updating value", err);
      });
    };

    function insertVehicle() {
      var insertData = {
        harnessNumberOne: vm.insertedharnessNumberOne,
        harnessNumberTwo: vm.insertedharnessNumberTwo,
        year: vm.insertedYear,
        make: vm.insertedMake,
        adapterNumber: vm.insertedadapterNumber,
        engine: vm.insertedEngine
      }
      if (vm.insertedYear && vm.insertedMake && vm.insertedEngine) {
        dataInteraction.insertSpecialVehicle(insertData).then(function(data) {
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

    function clearForm() {
      vm.insertedharnessNumberOne = null;
      vm.insertedharnessNumberTwo = null;
      vm.insertedYear = null;
      vm.insertedMake = null;
      vm.insertedEngine = null;
      vm.insertedadapterNumber = null;
    }

    function reset(vehicle) {
      vm.receiveData();
      vehicle.edit = null;
      vehicle.popover = false;
    };

    function edit(vehicle) {
      vehicle.edit = true;
    };
  });
