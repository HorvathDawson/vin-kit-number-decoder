angular.module("myApp")
  .controller("kitCrudController", function(dataInteraction) {
    var vm = this;
    vm.kitNames;
    vm.expanded;
    vm.parts;
    vm.newQuantity;
    vm.updatedQuantity;
    vm.insertedParts = [];
    vm.selectedKitPart;
    vm.newPartQuantity = 1;
    vm.hasEcm = false;
    vm.insertedKitName;
    vm.alerts = [];
    vm.kitParts = {};

    vm.receiveKitParts = receiveKitParts;
    vm.receiveKitPart = receiveKitPart;
    vm.receiveParts = receiveParts;
    vm.receiveKitNames = receiveKitNames;

    vm.updateQuantity = updateQuantity;
    vm.edit = edit;

    vm.addInsertPart = addInsertPart;
    vm.removeInsertPart = removeInsertPart;
    vm.insertKit = insertKit;
    vm.deleteKit = deleteKit;
    vm.deleteKitPart = deleteKitPart;
    vm.selectedKitPartToAdd = selectedKitPartToAdd;
    vm.insertKitPart = insertKitPart;

    vm.closeAlert = closeAlert;
    vm.addAlert = addAlert;

    vm.expand = expand;
    vm.reset = reset;
    vm.clearForm = clearForm;
    vm.changeEcm = changeEcm;

    vm.receiveKitNames();
    vm.receiveKitParts();




    /* misc stuff */
    function changeEcm(kit) {
      console.log(kit.id + "  :  " + ((kit.hasEcm)? 0 : 1));
      let data = {
        kitId: kit.id,
        hasEcm: ((kit.hasEcm)? 0 : 1)
      }
      dataInteraction.updateEcm(data).then(() => {
        kit.popup = null;
        vm.receiveKitNames();
      })
    }
    function expand(kit) {
      if (vm.expanded == kit.id) {
        vm.expanded = null;
      } else {
        vm.expanded = kit.id;
        vm.receiveKitPart(kit)
        vm.newPartQuantity = 1;
        vm.updatedPart = null;
      }
    }
    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    };
    function addAlert(msg, type) {
      vm.alerts.push({
        msg: msg,
        type: type
      });
    };
    function reset(item) {
      item.popover = null;
      item.popup = null;
      item.edit = null;
    }
    function edit(part) {
      part.edit = true;
      vm.updatedQuantity = part.quantity;
    }


    /* insert kit form*/
    function clearForm() {
      vm.hasEcm = false;
      vm.insertedKitName = null;
      vm.insertedParts = [];
    }
    /* addInsertPart and removeInsertPart are for the table of parts when inserting new kits */
    function addInsertPart(part) {
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
    function removeInsertPart(index) {
      vm.insertedParts.splice(index, 1);
    };
    function insertKit() {
      if(vm.insertedKitName){
        let data = {
          hasEcm: vm.hasEcm,
          kitId: vm.insertedKitName,
          parts: vm.insertedParts
        }
        dataInteraction.insertKit(data).then((data) => {
          if (JSON.stringify(data.data.error) == JSON.stringify({
              errno: 19,
              code: "SQLITE_CONSTRAINT"
            })) {
            vm.addAlert('Kit Number is already in database', 'danger')
          } else {
            vm.clearForm();
            vm.receiveKitNames();
            vm.expand({
              id: vm.insertedKitName
            })
            vm.addAlert('you have successfully added a Kit', 'success')
          }
        });
      }else{
        vm.addAlert('missing Kit Name', 'danger')
      }
    };


    /*delete kit*/
    function deleteKit(kitId) {
      dataInteraction.deleteKit(kitId).then(() => {
        vm.addAlert(`Successfully Deleted Kit: ${kitId}`, 'danger')
        vm.receiveKitNames();
      })
    }

    /*kit part modification*/
    /*deleting*/
    function deleteKitPart(kit, part) {
      part.popover = false;
      let data = {
        kitId: kit.id,
        partNumber: part.number
      }
      dataInteraction.deleteKitPart(data).then(() => {
        vm.receiveKitPart(kit);
      })
    }
    /*inserting*/
    function selectedKitPartToAdd(part) {
      vm.selectedKitPart = part;
    }
    function insertKitPart(kit) {
      if (vm.selectedKitPart) {
        let data = {
          kitId: kit.id,
          partNumber: vm.selectedKitPart.number,
          quantity: vm.newPartQuantity
        }
        dataInteraction.insertKitPart(data).then(() => {
          vm.receiveKitPart(kit);
        })
      } else {
        alert("missing field")
      }
    }
    /* update kitPart */
    function updateQuantity(kit, part) {
      part.edit = null;
      let data = {
        kitId: kit.id,
        partNumber: part.number,
        quantity: vm.updatedQuantity
      }
      dataInteraction.updateQuantity(data).then(() => {
        vm.receiveKitPart(kit);
      })
    }

    /*get data */
    //for drop dropdown
    function receiveParts(existingParts) {
      dataInteraction.receivePartsData().then(function successCallback(response) {
        vm.parts = response.data;
        if (existingParts) {
          vm.parts = vm.parts.filter((part) => {
            var test = true;
            existingParts.forEach((usedPart) => {
              if (part.number == usedPart.number) {
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

  });
