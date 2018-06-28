angular.module("myApp")
  .controller("kitCrudController", function(dataInteraction) {
    var vm = this;
    vm.kitNames;
    vm.expanded;
    vm.parts;
    vm.newQuantity;
    vm.updatedQuantity;
    vm.insertedParts = [];
    vm.updatedPart;
    vm.newPartQuantity = 1;
    vm.hasEcm = false;
    vm.insertedKitName;
    vm.alerts = [];
    vm.kitParts = {};
    vm.confirmEdit = confirmEdit;
    vm.insertPart = insertPart;
    vm.deleteKit = deleteKit;
    vm.receiveKitParts = receiveKitParts;
    vm.receiveKitPart = receiveKitPart;
    vm.receiveParts = receiveParts;
    vm.receiveKitNames = receiveKitNames;
    vm.closeAlert = closeAlert;
    vm.addAlert = addAlert;
    vm.updatePart = updatePart;
    vm.insertKit = insertKit;
    vm.expand = expand;
    vm.reset = reset;
    vm.updateKit = updateKit;
    vm.clearForm = clearForm;
    vm.removePart = removePart;
    vm.editQuantity = editQuantity;
    vm.receiveKitNames();
    vm.receiveKitParts();
    function confirmEdit(kitId, partNumber) {
      console.log(kitId + "  :  " + partNumber + "  :  " + vm.updatedQuantity);
    }
    function editQuantity(part) {
      part.edit = true;
      vm.updatedQuantity = part.quantity;
    }
    function reset(part) {
      part.edit = null;
    }
    function deleteKit(kitId, partNumber) {
        console.log(kitId + "  :  " + partNumber);
    }
    function updateKit(kitId) {
      if(vm.updatedPart){
        console.log(kitId + "  :  " + vm.updatedPart.number + "  :  " + vm.newPartQuantity);
      }else{
        alert("missing field")
      }
    }
    function removePart(index) {
      vm.insertedParts.splice(index, 1);
    };
    function insertKit() {
      console.log(vm.hasEcm + "  :  " + vm.insertedKitName);
      console.log(vm.insertedParts);
    };
    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    };
    function addAlert(msg, type) {
      vm.alerts.push({
        msg: msg,
        type: type
      });
    };
    function updatePart(part) {
      vm.updatedPart = part;
    }
    function insertPart(part) {
      var temp = vm.insertedParts.filter((partNumber) => {
        return partNumber.number == part.number
      })
      if (!temp[0]) {
        part = {
          quantity: 1,
          number: part.number
        }
        vm.insertedParts.push(part)
      } else {
        vm.addAlert('already selected', 'danger')
      }
    }
    function clearForm() {
      vm.hasEcm = false;
      vm.insertedKitName = null;
      vm.insertedParts = [];
    }
    //for drop dropdown
    function receiveParts(alreadyUsedParts) {
      dataInteraction.receivePartsData().then(function successCallback(response) {
        vm.parts = response.data;
        if(alreadyUsedParts){
          vm.parts = vm.parts.filter((part) => {
            var test = true;
            alreadyUsedParts.forEach((usedPart) => {
              if(part.number == usedPart.number){
                test = false;
              }
            })
            return test
          })
        }
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });

    }
    //recieve all parts for every kit
    function receiveKitParts() {
      dataInteraction.receiveKitPartsData().then(function successCallback(response) {
        vm.kitParts = response.data;
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });
    }
    //recieve parts for the kit you specify
    function receiveKitPart(kit) {
      dataInteraction.receiveKitPartData(kit.id).then(function successCallback(response) {
        vm.kitParts[kit.id] = response.data;
      }, function errorCallback(error) {
        console.log('error getting data', error);
      })
    }
    //recieve the names of each kit
    function receiveKitNames() {
      dataInteraction.receiveKitNames().then(function successCallback(response) {
        vm.kitNames = response.data;
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });
    }

    function expand(kit) {
      if(vm.expanded == kit.id){
        vm.expanded = null;
      }else{
        vm.expanded = kit.id;
        vm.newPartQuantity = 1;
        vm.updatedPart = null;
      }
    }

  });
