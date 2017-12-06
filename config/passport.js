const passport      = require('passport');
const User          = require('../models/user');
const jwtOptions    = require ('./jwtOptions');
const passportJWT   = require("passport-jwt");
const JwtStrategy   = passportJWT.Strategy;

const strategy = new JwtStrategy(jwtOptions,(jwt_payload, done) => {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  User.findById(jwt_payload.id, (err, user)=>{
    // var user = users[_.findIndex(users, {id: jwt_payload.id})];
    console.log('passportStrategy user:', user);
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(strategy);

module.exports = passport;
