
angular.module('myApp').service('vinNumberService', function($q, $http){
  this.importVinNumbers = function(url){
    return $http({
      method: 'GET',
      url: url,
      responseType: 'arraybuffer'
    }).then(function(data) {
      var wb = XLSX.read(data.data, {
        type: "array"
      });
      var d = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      return d;
    })
  }
})
