let config = require('./../../config/environment');
let User = require('./user.model');
let jwt = require('jsonwebtoken');
let authService = require('../../auth/auth.service');


module.exports.index = function(req, res){
    // grab all the users from the db.
     User.find({}, '-salt -password').exec().then(users => {
       res.status(200);
       res.json(users);
    });
}

module.exports.create = function(req, res){
  let user = new User(req.body);
  user.provider = 'local';
  user.role = 'user';
  user.save().then(user => {
      req.user = user;
      authService.setTokenCookie(req, res);
  }); 
}
