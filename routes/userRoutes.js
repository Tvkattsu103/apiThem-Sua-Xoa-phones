const express = require('express');
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const passportConfig = require('../middlewares/passport')
const userControllers = require('../controllers/userControllers');

const app = express();
//login
app.post('/login', passport.authenticate('local', { failureRedirect: '/login', session: false}), userControllers.login);

app.post('/signup', userControllers.adduser);

app.get("/login", (req, res) => {
    fs.readFile("./routes/login.html", "utf8", (err, data) => {
        if (err) throw err;
        res.send(data);
    })
});

module.exports = app;