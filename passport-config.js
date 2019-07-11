const {Strategy, ExtractJwt} = require('passport-jwt');
require('dotenv').config();
const config = require('./public/config/config.js');
// const mongoose = require('mongoose');
const Teacher = require('./public/models').Teacher;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.privateKey
};
//this sets how we handle tokens coming from the requests that come
// and also defines the key to be used when verifying the token.
module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
             Teacher.findByPk(payload.id)
                 .then(teacher => {
                     if(teacher){
                       return done(null, {
                           id: teacher.id,
                           email: teacher.email,
                       });
                     }
                     return done(null, false);
                  }).catch(err => console.error(err));
              })
           );
     };