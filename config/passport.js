var passportLocalStrategy = require('passport-local').Strategy;
var userModel = require('../app/user');

module.exports = function (passport) {

  passport.serialize(function(user, done) {
        done(null, user.id);
  });
  
  passport.deserialize(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

  passport.use('local-signup', new passportLocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  },

  function(username, password, done) {
    userModel.findOne({ username: username }, function(err, user) {
      if (err) { 
        return done(err); 
      }
      if (user) {
        return done(null, false, { message: 'That username is taken.'});
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }))

}