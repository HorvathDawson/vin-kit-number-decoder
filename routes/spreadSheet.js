var express = require('express');
var router = express.Router();
var path = require('path');
var rp = require('request-promise');
var comparison = require('../services/vinComparison.js');
var helper = require('../services/spreadSheetHelper.js');
var test = require('../services/vinWebApi.js');
var multer = require('multer');
var fs = require('fs');

var upload = multer({
  dest: 'upload/'
});

router.post('/upload', upload.single('file'), async function(req, res, next) {
  try {
    var joinedVinNumbers = await helper.joinVinNumbers(req.file.filename);
    var vinData = await helper.readSpreadSheet(req.file.filename);
    helper.deleteFile(req.file.filename);
    var options = {
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
    rp(options).then((body) => {
      let json = JSON.parse(body);
      return json.Results.map((vinInfo, index) => {
        return Object.assign(vinInfo, vinData[index]);
      })
    }).then((body) => {
      return comparison.compare(body)
    }).then(async (body) => {
      var wb = await helper.makeWorkBook();
      wb = await helper.addDataWb(wb, body.errorData, 'errorData');
      wb = await helper.addDataWb(wb, body.customerData, 'customerData');
      wb = await helper.addDataWb(wb, body.employeeData, 'employeeData');
      res.send(wb);
    }).catch((err) => {
      console.log(err);
    });
  } catch (error) {
    res.render('error', {
      message: error.message,
      error: error
    })
  }
});


module.exports = router;
