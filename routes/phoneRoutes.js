const express= require('express');

const phoneControllers= require('../controllers/phoneControllers');
const valiDateRegister = require('../middlewares/phoneFormValidate');
const phoneExist = require('../middlewares/phoneExist');
const app = express();
// app.use(valiDateRegister);
//add data
app.post('/phone', valiDateRegister, phoneExist, phoneControllers.addcontact);

//get data
app.get('/list',phoneControllers.getcontact);

//update data
app.patch('/phone/:id',valiDateRegister,phoneControllers.updatecontact);

//delete data
app.delete('/phone/:id',phoneControllers.deletecontact);

module.exports= app;