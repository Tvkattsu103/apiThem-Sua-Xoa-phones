const express = require('express');
const userRouters = require('./userRoutes');
const phoneRouters = require('./phoneRoutes');
const app = express();

app.use('/api/users', userRouters);
app.use('/api/phone', phoneRouters);

module.exports = app;