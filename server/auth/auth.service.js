'use strict';
/*global require, module */
// let passport = require( 'passport');
let config = require( '../config/environment');
let jwt = require( 'jsonwebtoken');
let expressJwt = require( 'express-jwt');
let compose = require( 'composable-middleware');
let User = require( '../api/user/user.model');
let settings = require( '../config/environment/shared');

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
module.exports = {
   isAuthenticated: function isAuthenticated() {
   return compose()
     // Validate jwt
     .use(function(req, res, next) {
       // allow access_token to be passed through query parameter as well
       if (req.query && req.query.hasOwnProperty('access_token')) {
         req.headers.authorization = 'Bearer ' + req.query.access_token;
       }
       validateJwt(req, res, next);
     })
     // Attach user to request
     .use(function(req, res, next) {
       User.findById(req.user._id).exec()
         .then(user => {
           if (!user) {
             return res.status(401).end();
           }
           req.user = user;
           next();
         })
         .catch(err => next(err));
     });
 },
 hasRole: function hasRole(roleRequired) {
   if (!roleRequired) {
     throw new Error('Required role needs to be set');
   }

   return compose()
     .use(this.isAuthenticated())
     .use(function meetsRequirements(req, res, next) {
       if (config.userRoles.indexOf(req.user.role) >=
           config.userRoles.indexOf(roleRequired)) {
         next();
       } else {
         res.status(403).send('Forbidden');
       }
     });
 },
signToken: function signToken(id, role, done) {
      done(jwt.sign({ _id: id, role: role }, config.secrets.session, {
      expiresIn: settings.sessionTimeout
   }));
 },
 setTokenCookie: function setTokenCookie(req, res) {
   if (!req.user) {
     return res.status(404).send('It looks like you aren\'t logged in, please try again.');
   }
   this.signToken(req.user._id, req.user.role, function(token){
     res.cookie('token', token);
     req.user.token = token;
     res.json(token);
   });


  //  res.redirect('/');
}
};
