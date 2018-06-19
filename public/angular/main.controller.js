angular.module("myApp", ['ui.bootstrap', 'ngFileUpload']);

angular.module("myApp")
  .controller("mainController", function() {
    var vm = this;
    vm.tabs = [{
        title: 'Normal Vehicles',
        content: '/normalTab.html'
      },
      {
        title: 'Special Vehicles',
        content: '/specialTab.html'
      }
    ];
  });
