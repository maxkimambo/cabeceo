let router = require('express').Router();
let config = require('./../../config/environment');

router.get('/', function(req, res){
  res.json(config);
});
module.exports = router;
