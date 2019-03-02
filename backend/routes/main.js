var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use((req, res, next) => {
  next();
});

router.get('*', (req, res) => {
  res.render('index');
});

module.exports = router;