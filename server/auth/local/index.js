'use strict';
/*global require, module, __dirname */ 
let express = require('express');
let passport = require('passport');
let authService = require('./../auth.service');
let User = require('../../api/user/user.model');
var router = express.Router();

// if you follow the route composition
// we are at /api/authenticate/local
router.post('/', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    let loginFailure = {
        success: false,
        message: 'Login failed'
    };

    // find the user
    User.findOne({
        email: username
    }).exec().then(user => {

        if (!user) {
            res.json(loginFailure);
        } else {

            // authenticate the user using local strategy
            passport.authenticate('local', function(err, user, info) {
                var error = err || info;

                if (error) {
                    return next(error);
                }
                // no user returned means we failed to auth
                if (!user) {
                    return res.status(401).json(loginFailure);
                }
                // else we got the user issue the damn token.
                var token = authService.signToken(user._id, user.role);
                res.json({
                    token
                });

            })(req, res, next);
        }
    });

});

module.exports = router;
