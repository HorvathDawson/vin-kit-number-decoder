var express = require('express');
var router = express.Router();
var crud = require('../services/partsTableInteraction.js');

router.get('/load', async function(req, res, next) {
  var data = await crud.loadParts();
  res.send(data);
});

/*main table crud routing */

router.post('/insert', async function(req, res, next) {
  try {
    var insertedData = {
      number: req.body.number,
      averageCost: req.body.averageCost,
      note: req.body.note
    }
    await crud.insertPart(insertedData)
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }
});

router.post('/update', async function(req, res, next) {
  var updateData = {
    number: req.body.number,
    averageCost: req.body.averageCost,
    note: req.body.note
  }
  await crud.updatePart(updateData);
  res.end();
});

router.post('/delete', async function(req, res, next) {
  var deleteData = {
    number: req.body.number
  }
  await crud.deletePart(deleteData);
  res.end();
});

module.exports = router;
