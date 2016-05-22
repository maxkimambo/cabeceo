'use strict';

let express = require('express');
let passport = require('passport');
let authService = require('../auth.service');

var router = express.Router();

// if you follow the route composition
// we are at /api/authenticate/local
router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).json({message: 'Something went wrong, please try again.'});
    }
    var token = authService.signToken(user._id, user.role);
    res.json({ token });

  })(req, res, next)
});

module.exports = router;
