
angular.module("myApp")
  .controller("fileUpload", function($http) {
    var vm = this;
    vm.fileUpload = fileUpload;
    
    function fileUpload() {
      var file = vm.spreadsheet;
      var payload = new FormData();
      payload.append('file', file);
      $http.post('/file/upload', payload, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        })
        .then(function(data) {
          XLSX.writeFile(data.data, "vinInformation.xlsx");
        }, function(err) {
          console.log("error adding value", err);
        });
    };
  });
