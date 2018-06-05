var express = require('express');
var router = express.Router();
var sqlite = require('sqlite');
var path = require('path');

var INSERT_DATA = 'INSERT INTO regularVinNumber (year, make, harnessType) VALUES (?, ?, ?)';
var SELECT_DATA = 'SELECT * FROM regularVinNumber WHERE year = ? AND make = ?';
var SELECT_ALL_DATA = 'SELECT * FROM regularVinNumber';
var UPDATE_DATA = 'UPDATE regularVinNumber SET year = ?, make = ?, harnessType = ? WHERE year = ? AND make = ?';
var DELETE_DATA = 'DELETE FROM regularVinNumber WHERE year = ? AND make = ?';
/* GET home page. */
async function openDataBases() {
  return await Promise.all([
    sqlite.open('./db/mainVinDb.db', {
      Promise
    }),
    sqlite.open('./db/specialVinDb.db', {
      Promise
    })
  ])
}

router.get('/crud', function(req, res, next) {
  res.sendfile('crudForm.html', {root: path.join(__dirname, '../public')})
});

router.get('/getAllData', async function(req, res, next) {
  const [mainDb, specialDb] = await openDataBases();
  var data = await mainDb.all(SELECT_ALL_DATA);
  res.send(data);
});
router.post('/insert/submit', async function(req, res, next) {
  var insertedData = {
    year: req.body.year,
    make: req.body.make,
    harnessType: req.body.harnessType
  }
  const [mainDb, specialDb] = await openDataBases();
  await mainDb.run( INSERT_DATA, insertedData.year, insertedData.make, insertedData.harnessType);
  res.redirect('/crud');
});

router.post('/update/submit', async function(req, res, next) {
  var updateData = {
    year: req.body.year,
    make: req.body.make,
    harnessType: req.body.harnessType
  }
  const [mainDb, specialDb] = await openDataBases();
  await mainDb.run( UPDATE_DATA, updateData.year, updateData.make, updateData.harnessType, );
  res.redirect('/crud');
});

module.exports = router;
