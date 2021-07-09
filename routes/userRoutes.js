const express= require('express');
const userControllers = require('../controllers/userControllers');

const app = express();
//login
app.post('/login', userControllers.login);

module.exports= app;