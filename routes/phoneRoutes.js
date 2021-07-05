const express= require('express');

const phoneControllers= require('../controllers/phoneControllers');
const validDateRegister = require('../middlewares/phoneFormValiddate')
const app= express();

//add data
app.post('/phone',validDateRegister,phoneControllers.adddanhba);

//get data
app.get('/list',phoneControllers.getdanhba);

//update data
app.patch('/phone/:id',phoneControllers.updatedanhba);

//delete data
app.delete('/phone/:id',phoneControllers.deletedanhba);

module.exports= app;