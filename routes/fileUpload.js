var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var fileUpload = require('express-fileupload');
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
    json: {
      format: "json",
      data: req.params.data,
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  callback = function(response) {
    console.log(response);
  }
  request(options, callback);

  res.redirect('/crud');
});
module.exports = router;
