let config = require('./../../config/environment');
let User = require('./user.model');
let jwt = require('jsonwebtoken');


module.exports.index = function(req, res){
    // grab all the users from the db.
     User.find({}, '-salt -password').exec().then(users => {
       res.status(200);
       res.json(users);
    });
}
