const {Strategy, ExtractJwt} = require('passport-jwt');
require('dotenv').config();
const config = require('./public/config/config.json');
const mongoose = require('mongoose');
const User = require('./public/models/user');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.privateKey
};
//this sets how we handle tokens coming from the requests that come
// and also defines the key to be used when verifying the token.
module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            console.log(333333, payload)
             User.findById(payload.id)
                 .then(user => {
                     if(user){
                       return done(null, {
                           id: user.id,
                           name: user.name,
                           email: user.email,
                       });
                     }
                     return done(null, false);
                  }).catch(err => console.error(err));
              })
           );
     };