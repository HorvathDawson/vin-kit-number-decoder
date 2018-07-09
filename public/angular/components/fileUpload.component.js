angular.module('myApp')
.component('fileUpload', {
  templateUrl: '../../uploadFile.html',
  controller: fileUpload,
  controllerAs: 'file'
});

function fileUpload($http) {
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
        console.log("error uploading file");
      });
  }
}
