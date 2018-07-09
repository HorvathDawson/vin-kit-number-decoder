var express = require('express');
var compression = require('compression');
var router = express.Router();
var crud = require('../services/partsTableInteraction.js');

router.use(compression())
router.get('/load', async function(req, res, next) {
  var data = {};
  data.data = await crud.loadParts();
  data.types = await crud.loadPartTypes();
  res.send(data);
});

/*main table crud routing */

router.post('/insert', async function(req, res, next) {
  try {
    var insertedData = {
      number: req.body.number,
      averageCost: req.body.averageCost,
      note: req.body.note,
      partType: req.body.partType
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
  try{
    var updateData = {
      number: req.body.number,
      averageCost: req.body.averageCost,
      note: req.body.note,
      partType: req.body.partType
    }
    await crud.updatePart(updateData);
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }
});

router.post('/delete', async function(req, res, next) {
  try{
    var deleteData = {
      number: req.body.number
    }
    await crud.deletePart(deleteData);
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }

});

module.exports = router;
