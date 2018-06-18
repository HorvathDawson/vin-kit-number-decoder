var express = require('express');
var router = express.Router();
var crud = require('../services/dbInteraction.js');

router.get('/loadAll', async function(req, res, next) {
  var data = {
    all: await crud.loadAllVehicles(),
    special: await crud.loadAllSpecialVehicles()
  };
  res.send(data);
});

/*main table crud routing */

router.post('/insert', async function(req, res, next) {
  try{
    var insertedData = {
      year: req.body.year,
      make: req.body.make,
      harnessTypeOne: req.body.harnessTypeOne,
      harnessTypeTwo: req.body.harnessTypeTwo,
      adapterType: req.body.adapterType
    }
    await crud.insertVehicle(insertedData)
    res.end();
  }catch(error){
    res.send({
      error: error
    })
  }
});
router.post('/update', async function(req, res, next) {
  var updateData = {
    harnessTypeOne: req.body.harnessTypeOne,
    harnessTypeTwo: req.body.harnessTypeTwo,
    adapterType: req.body.adapterType,
    yearId: req.body.yearId,
    makeId: req.body.makeId
  }
  await crud.updateVehicle(updateData);
  res.end();
});
router.post('/delete', async function(req, res, next) {
  var deleteData = {
    yearId: req.body.year,
    makeId: req.body.make
  }
  await crud.deleteVehicle(deleteData);
  res.end();
});

/* special table crud routing */

router.post('/insert/special', async function(req, res, next) {
  try{
    var insertedData = {
      year: req.body.year,
      make: req.body.make,
      engine: req.body.engine,
      harnessTypeOne: req.body.harnessTypeOne,
      harnessTypeTwo: req.body.harnessTypeTwo,
      adapterType: req.body.adapterType
    }
    await crud.insertSpecialVehicle(insertedData)
    res.end();
  }catch(error){
    res.send({
      error: error
    })
  }
});
router.post('/update/special', async function(req, res, next) {
  var updateData = {
    harnessTypeOne: req.body.harnessTypeOne,
    harnessTypeTwo: req.body.harnessTypeTwo,
    adapterType: req.body.adapterType,
    yearId: req.body.yearId,
    makeId: req.body.makeId,
    engineId: req.body.engineId
  }
  await crud.updateSpecialVehicle(updateData);
  res.end();
});
router.post('/delete/special', async function(req, res, next) {
  var deleteData = {
    yearId: req.body.year,
    makeId: req.body.make,
    engineId: req.body.engine
  }
  await crud.deleteSpecialVehicle(deleteData);
  res.end();
});

module.exports = router;
