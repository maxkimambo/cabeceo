let router = require('express').Router();

router.get('/', function(req, res){
  res.send('Testing');
});

module.exports = router;
