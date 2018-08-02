var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('关于我们');
});
router.get('/login', function(req, res, next) {
  res.send('登录');
});

module.exports = router;
