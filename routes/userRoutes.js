const express = require('express');
const passport = require('passport')
const passportConfig = require('../middlewares/passport');
const userControllers = require('../controllers/userControllers');

const app = express();
//login
app.
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

app.post('/signup', userControllers.adduser);

module.exports = app;