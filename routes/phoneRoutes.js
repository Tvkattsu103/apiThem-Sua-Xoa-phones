const express = require('express');

const phoneControllers = require('../controllers/phoneControllers');
const valiDateRegister = require('../middlewares/phoneFormValidate');
const phoneExist = require('../middlewares/phoneExist');
const auth = require('../middlewares/authJwt')
const app = express();

app.use(auth);

//add data
app.post('/register', valiDateRegister, phoneExist, phoneControllers.addcontact);

//get data
app.get('/list', phoneControllers.getcontact);

//update data
app.put('/:id', valiDateRegister, phoneControllers.updatecontact);

//delete data
app.delete('/:id', phoneControllers.deletecontact);

module.exports = app;