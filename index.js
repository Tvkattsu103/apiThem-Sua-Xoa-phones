require('dotenv').config();
const express = require('express');
const appRoutes = require('./routes');
const app = express();
const cors = require('cors');
const User = require('./models/user');
const passport = require('passport')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


const port = process.env.APP_PORT || 5000;
const host = process.env.APP_HOST;
app.use(express.json());

const mongoose = require('./db')();
const db = mongoose.connection;
db.once('open', function () {
  console.log("Open MongoDB")
})

app.use(passport.initialize());
app.use(passport.session());


// passport.serializeUser(function (user, done) {
//   console.log("Serialize here, got " + JSON.stringify(user));
//   done(null, user._id);
// });
// passport.deserializeUser(function (id, done) {
//   console.log("2")
//   db.collection("users").findOne({ _id: mongodb.ObjectId(id) })
//       .then(
//           doc => done(null, doc),
//           reason => done(reason)
//       );
// });
passport.serializeUser(function(user, done) {
  done(null, user);
  // console.log(user)
  console.log("1")
});

passport.deserializeUser(function(user, done) {
  done(null, user);
  console.log("2")
});

app.use('/', appRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${host}:${port}`)
});
