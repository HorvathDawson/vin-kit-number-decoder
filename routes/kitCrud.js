var express = require('express');
var compression = require('compression');
var router = express.Router();
var crud = require('../services/kitTableInteraction.js');

router.use(compression())
router.get('/loadNames', async function(req, res, next) {
  var data = await crud.loadKitName();
  res.send(data);
});
router.get('/loadKitParts', async function(req, res, next) {
  var data = await crud.loadKitParts();
  res.send(data);
});
router.post('/loadKitPart', async function(req, res, next) {
  var data = await crud.loadKitPart(req.body.kitNumber);
  res.send(data);
});

/*main table crud routing */

router.post('/insertKit', async function(req, res, next) {
  try {
    data = {
      kitId: req.body.kitId,
      hasEcm: req.body.hasEcm,
      parts: req.body.parts
    }
    await crud.insertKit(data);
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }
});
router.post('/insertKitPart', async function(req, res, next) {
  try {
    await crud.insertKitPart(req.body)
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }
});

router.post('/updateQuantity', async function(req, res, next) {
  try{
    await crud.updateQuantity(req.body);
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }

});
router.post('/updateEcm', async function(req, res, next) {
  try{
    await crud.updateEcm(req.body);
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }
});

router.post('/deletePart', async function(req, res, next) {
  try{
    await crud.deleteKitPart(req.body);
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }
});
router.post('/deleteKit', async function(req, res, next) {
  try{
    await crud.deleteKit(req.body.kitId)
    res.end();
  } catch (error) {
    res.send({
      error: error
    })
  }
});

module.exports = router;
