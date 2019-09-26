const index = require('./views/index.js');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('made it to GET /wiki/');
});

router.post('/', function (req, res, next) {
  res.send('made it to POST /wiki/');
});

router.get('/add', function (req, res, next) {
  res.send(addPage);
});

module.exports = router;
