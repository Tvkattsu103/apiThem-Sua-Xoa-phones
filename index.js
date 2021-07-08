const express=require('express');
const phoneRoutes = require('./routes/phoneRoutes');
const app = express();
const cors = require('cors');

require('dotenv').config();

const port=process.env.APP_PORT || 5000;
const host= process.env.APP_HOST;
app.use(express.json());

const mongoose = require('./db')();
const db = mongoose.connection;
db.once('open', function() {
    console.log("Open MongoDB")
})


app.use(phoneRoutes);


app.listen(port, () => {
        console.log(`Server running on port ${host}:${port}`)
      });
