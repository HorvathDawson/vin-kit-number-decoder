angular.module("myApp")
  .controller("kitCrudController", function(dataInteraction) {
    var vm = this;
    vm.kitNames;
    vm.parts;
    vm.insertedParts = [];
    vm.hasEcm = false;
    vm.allExpanded;
    vm.insertedKitName;
    vm.alerts = [];
    vm.kitParts = {};
    vm.addPart = addPart;
    vm.receiveKitParts = receiveKitParts;
    vm.receiveKitPart = receiveKitPart;
    vm.receiveParts = receiveParts;
    vm.receiveKitNames = receiveKitNames;
    vm.closeAlert = closeAlert;
    vm.addAlert = addAlert;
    vm.insertKit = insertKit;
    vm.expand = expand;
    vm.expandAll = expandAll;
    vm.clearForm = clearForm;
    vm.removePart = removePart;
    vm.receiveKitNames();
    vm.receiveKitParts();

    function removePart(index) {
      vm.insertedParts.splice(index, 1);
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

    function addPart(number) {
      var temp = vm.insertedParts.filter((partNumber) => {
        if (partNumber == number) {
          return "failed"
        }
      })
      if (!temp[0]) {
        vm.insertedParts.push(number)
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
    function receiveParts() {
      dataInteraction.receivePartsData().then(function successCallback(response) {
        vm.parts = response.data;
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
      if (!kit.expanded) {
        kit.expanded = true;
      } else {
        kit.expanded = null;
      }
    }
    function insertKit() {

    }
    function expandAll() {

      vm.kitNames.forEach((kit) => {
        if (!vm.allExpanded) {
          kit.expanded = true;
        } else {
          kit.expanded = false;
        }
      })
      vm.allExpanded = !vm.allExpanded;
    }

  });
