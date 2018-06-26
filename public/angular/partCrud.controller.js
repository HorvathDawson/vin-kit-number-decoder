angular.module("myApp")
  .controller("partCrudController", function(dataInteraction) {
    var vm = this;
    vm.insertedNote;
    vm.insertedNumber;
    vm.insertedAverageCost;
    vm.alerts = [];
    vm.parts;
    vm.clearForm = clearForm;
    vm.closeAlert = closeAlert;
    vm.insertPart = insertPart;
    vm.updatePart = updatePart;
    vm.reset = reset;
    vm.deletePart = deletePart;
    vm.edit = edit;
    vm.receiveData = receiveData;
    vm.addAlert = addAlert;
    vm.receiveData();

    function receiveData() {
      dataInteraction.receivePartsData().then(function successCallback(response) {
        vm.parts = response.data;
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });
    }
    function addAlert(msg, type) {
      vm.alerts.push({
        msg: msg,
        type: type
      });
    };
    function insertPart(){
      var insertData = {
        number: vm.insertedNumber,
        note: vm.insertedNote,
        averageCost: vm.insertedAverageCost
      }
      if(vm.insertedNumber){
        dataInteraction.insertPart(insertData).then(function(data) {
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
      }else{
        vm.addAlert('missing field', 'danger');
      }

    }
    function updatePart(part){
      dataInteraction.updatePart(part).then(function() {
        part.edit = null;
        vm.receiveData();
      }, function(err) {
        console.log("error updating value", err);
      });
    }
    function reset(part){
      part.edit = null;
      part.popover = false;
      vm.receiveData();
    }
    function deletePart(part){
      dataInteraction.deletePart(part).then(function() {
        vm.receiveData();
      }, function(err) {
        console.log("error deleting value", err);
      });
    }
    function edit(part){
      part.edit = true;
    }
    function closeAlert(index){
      vm.alerts.splice(index, 1);
    }
    function clearForm() {
      vm.insertedNote = null;
      vm.insertedNumber = null;
      vm.insertedAverageCost = null;
    }

  });