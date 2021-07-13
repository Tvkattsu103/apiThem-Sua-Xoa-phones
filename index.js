const express = require('express');
const appRoutes = require('./routes');
const app = express();
const cors = require('cors');
const User = require('./models/user');
const passport = require('passport')

require('dotenv').config();

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

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
  console.log("1")
});
// used to deserialize the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
      done(err, user);
  });
  console.log("2")
});

app.use('/', appRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${host}:${port}`)
});
