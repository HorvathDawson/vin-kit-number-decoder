angular.module("myApp")
  .controller("kitCrudController", function(dataInteraction) {
    var vm = this;
    vm.kits;
    vm.allExpanded;
    vm.kitParts = {};
    vm.receivePartsData = receivePartsData;
    vm.receiveNameData = receiveNameData;
    vm.expand = expand;
    vm.expandAll = expandAll;
    vm.receiveNameData();
    function onExpand(kitNumber){

    }
    function receivePartsData(kits) {
      kits.forEach((kit) => {
        dataInteraction.receiveKitPartsData(kit.id).then(function successCallback(response) {
          vm.kitParts[kit.id] = response.data;
        }, function errorCallback(error) {
          console.log('error getting data', error);
        });
      })
    }
    function receiveNameData() {
      dataInteraction.receiveKitNameData().then(function successCallback(response) {
        vm.kits = response.data;
        vm.receivePartsData(vm.kits);
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });
    }
    function expand(kit) {
      if(!kit.expanded){
        kit.expanded = true;
      }else{
        kit.expanded = null;
      }
    }
    function expandAll() {
      vm.kits.forEach((kit) => {
        if(!vm.allExpanded){
          kit.expanded = true;
        }else{
          kit.expanded = false;
        }
      })
      vm.allExpanded = !vm.allExpanded;
    }

  });
