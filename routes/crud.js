var express = require('express');
var router = express.Router();
var crud = require('../services/dbInteraction.js');

router.get('/loadAll', async function(req, res, next) {
  res.send(await crud.loadAllVehicles());
});
router.post('/insert', async function(req, res, next) {
  try{
    var insertedData = {
      year: req.body.year,
      make: req.body.make,
      harnessType: req.body.harnessType
    }
    await crud.insertVehicle(insertedData)
    res.end();
  }catch(error){
    // TODO: make a popup that displays this
    res.render('error', {
      message: 'make and year already exist',
      error: error
    })
  }
});
router.post('/update', async function(req, res, next) {
  var updateData = {
    harnessType: req.body.harnessType,
    yearId: req.body.yearId,
    makeId: req.body.makeId
  }
  await crud.updateVehicle(updateData);
  res.end();
});
router.post('/delete', async function(req, res, next) {
  var deleteData = {
    year: req.body.year,
    make: req.body.make
  }
  await crud.deleteVehicle(deleteData);
  res.end();
});

module.exports = router;
