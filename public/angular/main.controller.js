angular.module("myApp", ['ui.bootstrap', 'ngFileUpload', 'vinDataInteraction']);

angular.module("myApp")
  .controller("mainController", function() {
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
