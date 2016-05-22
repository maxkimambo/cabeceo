let passport = require('passport');
let LocalStrategy = require('passport-local');

function localAuthentication(User, email, password, done){

  User.findOne({email: email.toLowerCase()}).exec().then(user => {
    if (!user){
      return done(null, false, {
        // either way we just say login failed
        //  to avoid enumeration attacks.
        message: 'Login failed'
      });
    }
      user.authenticate(password, function(authError, authenticated){
        if (authError){
          return done(authError);
        }
        if (!authenticated){
          return done(null, false, {message: 'Login failed'})
        }else {
          return done(null, user);
        }
      });

  }).catch(err => done(err));

}

function setup(User, config){
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done){
    return localAuthentication(User, email, password, done);
  }));
}
module.exports = setup;
