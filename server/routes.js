'use strict';
let router = require('express').Router();
module.exports = function(app){

  router.get('/', function(req, res) {
      res.send('im the home page!');
  });


  app.use('/api/suggestions', require('./api/suggestion'));
  app.use('/api/users', router);

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  .get(errors[404]);

}
