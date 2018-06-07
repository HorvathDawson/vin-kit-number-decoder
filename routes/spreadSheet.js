var express = require('express');
var router = express.Router();
var path = require('path');
var fileUpload = require('express-fileupload');
var request = require('request');
var XLSX = require('xlsx');
var comparison = require('../services/vinComparison.js');

router.use(fileUpload());
router.post('/upload', async function(req, res, next) {
  try {
    var wb = XLSX.read(req.files.spreadsheet.data, {
      type: "array"
    });
    var vinData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    var importedVinNumbers = await vinData.map((vinObject) => {
      return vinObject.VIN;
    })
    var joinedVinNumbers = await importedVinNumbers.join(';')
    var vinApi = {
      url: 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/',
      method: 'POST',
      headers: {
        'contentType': 'application/json'
      },
      form: {
        format: "json",
        data: joinedVinNumbers
      }
    };
    request(vinApi, function(err, respond, body) {
      let json = JSON.parse(body);
      var test = json.Results.map((vinInfo, index) => {
        return Object.assign(vinInfo, vinData[index]);
      })
      var data = comparison.compare(test);
      res.send(data)
      console.log(data);
      res.end();
    });
  } catch (error) {
    res.render('error', {
      message: error.message,
      error: error
    })
  }
});

module.exports = router;
