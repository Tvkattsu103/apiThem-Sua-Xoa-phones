const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const privateKey = process.env.APP_PRIVATE_KEY;
const User = require('../models/user');

//authentucation with username, password
passport.use(new LocalStrategy(
    (tentaikhoan, matkhau, cb) => {
      console.log(tentaikhoan)
      User.findOne({ tentaikhoan: tentaikhoan }, (error, user) => {
        if (error) {
          cb({error: true})
        } else if (!user) {
          cb({error: true})
        } else {
          user.verifyPassword(matkhau, (matchError, isMatch) => {
            console.log(isMatch)
            if (matchError) {
              cb(null, false)
            } else if (!isMatch) {
              cb(null, false)
            } else {
              cb(null, user)
            }
          })
        }
      })
    }
))

const cookiesExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies["access_token"]
    }
    return token;
}

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: cookiesExtractor,
            secretOrKey: "privateKey",
        },
        (payload, done) => {
            User.findById({ _id: payload.sub }, (err, user) => {
                if (err) return done(err, false);
                if (user) return done(null, user);
                else return done(null, false);
            })
        }
    )
)