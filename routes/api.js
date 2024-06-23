var express = require('express');
var router = express.Router();

var apiUserRouter = require('./api/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api');
});

router.use('/user', apiUserRouter);

module.exports = router;
