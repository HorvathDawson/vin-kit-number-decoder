var express = require('express');
var compression = require('compression');
var router = express.Router();
var crud = require('../services/harnessTableInteraction.js');

router.use(compression())
router.get('/load', async function(req, res, next) {
  try{
    var data = await crud.loadHarness();
    res.send(data);
  } catch (error) {
    res.send({
      error: error
    })
  }
});

/*main table crud routing */

router.post('/insert', async function(req, res, next) {
  try {
    var insertedData = {
      harnessName: req.body.harnessName,
      mainHarness: req.body.mainHarness,
      adapterHarness: req.body.adapterHarness
    }
    await crud.insertHarness(insertedData)
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
      harnessName: req.body.harnessName,
      mainHarness: req.body.mainHarness,
      adapterHarness: req.body.adapterHarness,
      ROWID: req.body.ROWID
    }
    await crud.updateHarness(updateData);
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
      ROWID: req.body.ROWID
    }
    await crud.deleteHarness(deleteData);
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }
});

module.exports = router;
