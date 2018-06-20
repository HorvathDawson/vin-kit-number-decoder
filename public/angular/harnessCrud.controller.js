angular.module("myApp")
  .controller("harnessCrudController", function(vinDataInteraction) {
    vm.referenceString;
    vm.topLevel;
    vm.mainHarness;
    vm.adapterHarness;

    function clearHarness() {
      vm.referenceString = null;
      vm.topLevel = null;
      vm.mainHarness = null;
      vm.adapterHarness = null;
    }
    
  });
