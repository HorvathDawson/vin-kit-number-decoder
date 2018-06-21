var express = require('express');
var router = express.Router();
var crud = require('../services/harnessDbInteraction.js');

router.get('/load', async function(req, res, next) {
  var data = await crud.loadHarness();
  res.send(data);
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
  var updateData = {
    harnessName: req.body.harnessName,
    mainHarness: req.body.mainHarness,
    adapterHarness: req.body.adapterHarness,
    ROWID: req.body.ROWID
  }
  await crud.updateHarness(updateData);
  res.end();
});
router.post('/delete', async function(req, res, next) {
  var deleteData = {
    ROWID: req.body.ROWID
  }
  await crud.deleteHarness(deleteData);
  res.end();
});

module.exports = router;
