angular.module("myApp")
  .controller("harnessCrudController", function(dataInteraction) {
    var vm = this;
    vm.harnessName;
    vm.topLevel;
    vm.mainHarness;
    vm.adapterHarness;
    vm.harnesses;
    vm.receiveData = receiveData;
    vm.edit = edit;
    vm.reset = reset;
    vm.clearForm = clearForm;
    vm.insertHarness = insertHarness;
    vm.updateHarness = updateHarness;
    vm.deleteHarness = deleteHarness;

    vm.receiveData();

    function receiveData() {
      dataInteraction.receiveHarnessData().then(function successCallback(response) {
        vm.harnesses = response.data;
      }, function errorCallback(error) {
        console.log('error getting data', error);
      });
    }

    function clearForm() {
      vm.harnessName = null;
      vm.topLevel = null;
      vm.mainHarness = null;
      vm.adapterHarness = null;
    }

    function edit(harness) {
      harness.edit = true;
    }

    function reset(harness) {
      harness.popover = false;
      harness.edit = null;
      vm.receiveData();
    }

    function insertHarness() {
      var insertData = {
        harnessName: vm.harnessName,
        topLevel: vm.topLevel,
        mainHarness: vm.mainHarness,
        adapterHarness: vm.adapterHarness,
      }
      dataInteraction.insertHarness(insertData).then(function(data) {
        // TODO: compare with data to see if values ar ealready in
        vm.receiveData();
      }, function(err) {
        console.log("error adding value", err);
      });
    }

    function updateHarness(harness) {
      dataInteraction.updateHarness(harness).then(function() {
        harness.edit = null;
        vm.receiveData();
      }, function(err) {
        console.log("error updating value", err);
      });
    }

    function deleteHarness(harness) {
      dataInteraction.deleteHarness(harness).then(function() {
        vm.receiveData();
      }, function(err) {
        console.log("error deleting value", err);
      });
    }

  });
