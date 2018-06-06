var express = require('express');
var router = express.Router();
var path = require('path');
var fileUpload = require('express-fileupload');
var request = require('request');
var XLSX = require('xlsx');

router.use(fileUpload());
router.post('/upload', async function(req, res, next) {
  var wb = XLSX.read(req.files.spreadsheet.data, {
    type: "array"
  });
  var vinData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  console.log(vinData);
  var joinedVinNumbers = await vinData.map((vinObject) => {
    return vinObject.VIN;
  }).join(';')
  res.redirect('/file/testVin/' + joinedVinNumbers);
});
router.get('/testVin/:data', function(req, res, next) {
  console.log(req.params.data);
  var options = {
    url: 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/',
    method: 'POST',
    headers: {
      'contentType': 'application/json'
    },
    form: {
      format: "json",
      data: req.params.data
    }
  };
  request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
  });
  res.redirect('/crud');

  /*
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
    } */
});
module.exports = router;
