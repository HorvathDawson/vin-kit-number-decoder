var express = require('express');
var router = express.Router();
var path = require('path');
var fileUpload = require('express-fileupload');
var request = require('request');
var XLSX = require('xlsx');
var comparison = require('../services/vinComparison.js');
var multer  = require('multer');
//var upload  = multer({ storage: multer.memoryStorage() });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname+ '-' + Date.now()+'.jpg')
    }
});
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async function(req, res, next) {
  try{
    console.log(req.body);
    console.log(req.file);
    res.end();
  }catch(error){
    console.log(error);
    res.end();
  } 

  /*
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
      res.send(data);
    });
  } catch (error) {
    res.render('error', {
      message: error.message,
      error: error
    })
  } */
});

module.exports = router;
