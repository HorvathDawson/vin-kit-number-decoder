angular.module('myApp')
  .controller('importController', function($window, vinNumberService) {
    var vm = this;
    vm.vinResults;
    vm.joinedVinNumbers;
    vm.importedVinNumbers;
    vm.importSpreadSheet = importSpreadSheet;
    vm.vinDecoder = vinDecoder;

    function importSpreadSheet() {
      if (vm.inputFile.path) {
        vinNumberService.importVinNumbers(vm.inputFile.path)
          .then((vinData) => {
            vm.importedVinNumbers = vinData
            return vinData;
          }).then((vinData) => {
            return vinData.map((vinObject) => {
              return vinObject.VIN;
            })
          }).then((vinData) => {
            vm.joinedVinNumbers = vinData.join(';')
          });
      }
    }
    function vinDecoder(vinNumber) {
      $.ajax({
        url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
        type: "POST",
        data: {
          format: "json",
          data: vinNumber
        },
        dataType: "json",
        success: function(result) {
          vm.vinResults = result.Results;
          vm.vinResults = result.Results.map((vinInfo, index) => {
            return Object.assign(vinInfo, vm.importedVinNumbers[index]);
          })
          console.log(vm.vinResults);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log(xhr.status);
          console.log(thrownError);
        }
      });
    }
  })
