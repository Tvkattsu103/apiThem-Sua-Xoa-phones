const express=require('express');
const appRoutes = require('./routes');
const app = express();
const cors = require('cors');
const User = require('./models/user');

require('dotenv').config();

const port=process.env.APP_PORT || 5000;
const host= process.env.APP_HOST;
app.use(express.json());

const mongoose = require('./db')();
const db = mongoose.connection;
db.once('open', function() {
    console.log("Open MongoDB")
})


app.use('/', appRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${host}:${port}`)
});
