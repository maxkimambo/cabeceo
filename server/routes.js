'use strict';
let router = require('express').Router();
let authService = require('./auth/auth.service');
module.exports = function(app){

  // to secure the whole endpoint at once place isAuthenticated here
  // app.use('/api/suggestions',  authService.isAuthenticated(), require('./api/suggestion'));
  app.use('/api/suggestions',  require('./api/suggestion'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/authenticate', require('./auth'));
  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  .get(errors[404]);

}
