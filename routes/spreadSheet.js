var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var comparison = require('../services/vinComparison.js');
var helper = require('../services/spreadSheetHelper.js');
var test = require('../services/vinWebApi.js');
var multer = require('multer');

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
    request(options, function(err, respond, body) {
      let json = JSON.parse(body);
      var test = json.Results.map((vinInfo, index) => {
        return Object.assign(vinInfo, vinData[index]);
      })
      comparison.compare(test).then((value) => {
        console.log(value);
        res.send(JSON.stringify(value));
      }).catch((err) => {
        console.log(err);
      })

    });

  } catch (error) {
    res.render('error', {
      message: error.message,
      error: error
    })
  }
});

module.exports = router;
