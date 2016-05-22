let config = require('./../../config/environment');
let User = require('./user.model');
let jwt = require('jsonwebtoken');
let authService = require('../../auth/auth.service');
let log = require('../../components/logger');

const sensitiveData = '-salt -password';

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

module.exports.findById = function(req, res){
  let userId = req.params.id;
  // User.findOne({_id:userId}).exec().then(user => {
  //   res.json(user);
  // });
   _findById(userId).then(user => {
    res.json(user);
  });

}

// private function to find users by id;
// return a promise
function _findById(id){
    return User.findOne({_id:id}, sensitiveData).exec();
}

function _findRawById(id){
  return User.findOne({_id: id}).exec();
}

module.exports.update = function(req, res){
  console.log('got here');

   let userId = req.params.id;
   let newUser = req.body;

   console.log(userId);
   console.log(newUser);


   _findRawById(userId).then(user => {
       // loop over keys and update
      //  Object.keys(newUser).forEach(k => {
      //    user[k] = newUser[k];
      //  });
    let userToSave = Object.assign(user, newUser);

    res.json({result: userToSave });
     // save
     userToSave.save().then(err => {
       log.error(err);
     });

   });


}
