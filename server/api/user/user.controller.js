let config = require('./../../config/environment');
let User = require('./user.model');
let jwt = require('jsonwebtoken');
let authService = require('../../auth/auth.service');
let log = require('../../components/logger');

const sensitiveData = '-salt -password';

// returns all users
module.exports.index = function(req, res){
    // grab all the users from the db.
     User.find({}, '-salt -password').exec().then(users => {
       res.status(200);
       res.json(users);
    });
}

// Creates user
module.exports.create = function(req, res){
  let user = new User(req.body);
  user.provider = 'local';
  user.role = 'user';
  user.save().then(user => {
      req.user = user;
      authService.setTokenCookie(req, res);
  });
}

// fetches user by Id
module.exports.findById = function(req, res){
  let userId = req.params.id;

   _findById(userId).then(user => {
    res.json(user);
  });
}

// private function to find users by id;
// return a promise
function _findById(id){
    return User.findOne({_id:id}, sensitiveData).exec();
}

// finds raw user object by Id
function _findRawById(id){
  return User.findOne({_id: id}).exec();
}

// updates user
module.exports.update = function(req, res, next){
   let userId = req.params.id;
   let newUser = req.body;

   _findRawById(userId).then(user => {
    let userToSave = Object.assign(user, newUser);

     // save
     userToSave.save().then(user => {
       // do something with the user
         res.json({result: user });
     }).catch(err => {
       log.error(err);
       next(err);
     });
   });
}
/**
*  Changes the user password
*/
module.exports.password = function(req, res){
  let userId = req.params.id;
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;

    User.findOne({_id: userId}).exec().then(u => {
       if (u.authenticate(oldPassword)){

         u.password = newPassword;
         u.save().then(() => { res.status(204).end()});
       }
       else {
         res.status(403).end();
       }
    });
}
/*
* Updates user status
* can be set to different things like active : inactive : disabled etc 
*/
module.exports.setStatus = function(req, res){
  let userId = req.params.id;
  let status = req.body.status;

  User.findOne({_id: userId}).exec().then(user => {
      user.status = status;
      user.save().then(() => {res.status(204).end()});
  }).catch(err => {
    log.error(err);
    next(err);
  });
}

/**
* check if the password belongs to this user
*/
function _verifyPassword(userId, password){
  User.findOne({_id: userId}).exec().then(user => {
    if (user.authenticate(password)){
      return true;
    }
    return false;
  })
}
