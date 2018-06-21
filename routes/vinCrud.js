var express = require('express');
var router = express.Router();
var crud = require('../services/vehicleDbInteraction.js');

router.get('/loadNormal', async function(req, res, next) {
  var all = await crud.loadVehicles();
  all.forEach((vehicle) => {
    vehicle.key = (vehicle.year + ':' + vehicle.make).replace(/\s/g, '')
  });
  res.send(all);
});
router.get('/loadSpecial', async function(req, res, next) {
  var special = await crud.loadSpecialVehicles();
  special.forEach((vehicle) => {
    vehicle.key = (vehicle.year + ':' + vehicle.make + ':' + vehicle.engine).replace(/\s/g, '')
  });
  res.send(special);
});

/*main table crud routing */

router.post('/insert/normal', async function(req, res, next) {
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
router.post('/update/normal', async function(req, res, next) {
  var updateData = {
    harnessTypeOne: req.body.harnessTypeOne,
    harnessTypeTwo: req.body.harnessTypeTwo,
    adapterType: req.body.adapterType,
    yearId: req.body.year,
    makeId: req.body.make
  }
  await crud.updateVehicle(updateData);
  res.end();
});
router.post('/delete/normal', async function(req, res, next) {
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
    yearId: req.body.year,
    makeId: req.body.make,
    engineId: req.body.engine
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
