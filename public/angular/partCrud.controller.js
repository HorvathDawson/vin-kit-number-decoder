angular.module("myApp")
  .controller("partCrudController", function(dataInteraction) {
    var vm = this;
    vm.insertedNote;
    vm.insertedType;
    vm.insertedNumber;
    vm.insertedAverageCost;
    vm.alerts = [];
    vm.parts;
    vm.partTypes;
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
        vm.parts = response.data.data;
        vm.partTypes = response.data.types;
      }, function errorCallback(error) {
        console.log('error getting data');
      });
    };
    function addAlert(msg, type) {
      vm.alerts.push({
        msg: msg,
        type: type
      });
    };
    function insertPart(){
      var insertData = {
        number: vm.insertedNumber,
        partType: vm.insertedType,
        note: vm.insertedNote,
        averageCost: vm.insertedAverageCost
      }
      if(vm.insertedNumber && vm.insertedType){
        dataInteraction.insertPart(insertData).then(function(data) {
          if (data.data.error){
              if (data.data.error.errno == 19 && data.data.error.code == "SQLITE_CONSTRAINT") {
                vm.addAlert('part is already in database', 'danger')
              }
          } else {
            vm.addAlert('you have successfully added a part', 'success')
          }
          vm.receiveData();
        }, function(err) {
          console.log("error adding value");
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
        console.log("error updating value");
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
        console.log("error deleting value");
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
