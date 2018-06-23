var express = require('express');
var router = express.Router();
var crud = require('../services/kitDbInteraction.js');

router.get('/loadNames', async function(req, res, next) {
  var data = await crud.loadKitName();
  res.send(data);
});
router.post('/loadKitParts', async function(req, res, next) {
  var data = await crud.loadKitParts(req.body.kitNumber);
  res.send(data);
});

/*main table crud routing */

router.post('/insert', async function(req, res, next) {
  try {
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }
});

router.post('/update', async function(req, res, next) {
  res.end();
});

router.post('/delete', async function(req, res, next) {
  res.end();
});

module.exports = router;
