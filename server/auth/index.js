'use strict';
/*global require, module */
let express = require('express');

let config = require('../config/environment');
let User = require('../api/user/user.model');
// let authService = require('./auth.service');

var settings = require( '../config/environment');
let jwt = require( 'jsonwebtoken');

// configure passport
var setupPassport = require('./local/passport');
setupPassport(User, config);

var router = express.Router();
// router.use('/local', require('./local'));

// if you follow the route composition
// we are at /api/authenticate/local
router.post('/local', function(req, res) {

  let username = req.body.username;
  let password = req.body.password;

  let loginFailure = {
    success: false,
    message : 'Login failed'
  };

  // find the user
  User.findOne({email: username}).exec().then(user => {

    if (!user){
      res.json(loginFailure);
    }else {
      // we have a user so we need to check that the password matches
      user.authenticate(password, function(authError, authenticated){
        if (authError){
          res.json(authError);
        }
        // not authenticated return failure
        if (!authenticated){
          res.json(loginFailure);
        }

        // strip user object
        let userForToken = {
            _id: user._id,
            provider: user.provider,
            email: user.email
        };

        let token = jwt.sign(userForToken, settings.secrets.session, {
          sessionTimeout:settings.sessionTimeout
        });
        res.json(token);
      });
    }
  });





  // passport.authenticate('local', function(err, user, info) {
  //   var error = err || info;
  //   if (error) {
  //     return next(error);
  //   }
  //   if (!user) {
  //     return res.status(401).json({message: 'Something went wrong, please try again.'});
  //   }
  //   var token = authService.signToken(user._id, user.role);
  //   res.json({ token });
  //
  // })(req, res, next)
});




module.exports = router;
