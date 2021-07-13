const passport = require('passport');
require('dotenv').config;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const privateKey = process.env.APP_PRIVATE_KEY;
const User = require('../models/user');

//authentication with tentaikhoan,password
// const LocalStrategy = require('passport-local').Strategy
// function verify(username, password, done) {

//   User.findOne({ username: username })
//       .then(
//           doc => {
//               if (!doc) {
//                   console.log(`User ${username} doesn't exist`);
//                   done(null, false, { message: "User doesn't exist" });
//               }
//               if (doc.password != password) {
//                   console.log(`${password} is the wrong password`);
//                   done(null, false, { message: "Wrong password" });
//               }
//               else {
//                   console.log("AOK");
//                   done(null, doc);
//               }
//           },
//           reason => done(reason)
//       );
// }

// passport.use(new LocalStrategy(verify));

passport.use(new LocalStrategy(
    (tentaikhoan, matkhau, cb) => {
      console.log("hi")
      console.log(tentaikhoan, matkhau)
      User.findOne({ tentaikhoan: tentaikhoan }, (error, user) => {
        console.log(user)
        if (error) {
          cb({error: true})
        } else if (!user) {
          cb({error: true})
        } else {
          console.log(matkhau)
          user.verifyPassword(matkhau, (matchError, isMatch) => {
            console.log(isMatch)
            if (matchError) {
              cb(null, false)
            } else if (!isMatch) {
              cb(null, false)
            } else {
              console.log(user.matkhau)
              cb(null, user)
            }
          })
        }
      })
    }
))
        


const cookiesExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access-token"]
    }
    return token;
}

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: cookiesExtractor,
            secretOrKey: "privateKey"
        },
        (payload, done) => {
            User.findById({ _id: payload.sub }, (err, user) => {
                if (err) return done(err, false);
                if (user) return done(null, user);
                else return done(null, false);
            })
        })
)