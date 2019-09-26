const express = require('express');
const router = express.Router();


// const index = require('/views/index.js');

router.get('/', function (req, res, next) {
  res.send('helloWorld');
});

module.exports = router;
