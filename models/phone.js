const mongoose = require('mongoose');
const phoneSchema=new mongoose.Schema({
    tendanhba: String,
    sdt: String
});
const Phone = mongoose.model('Phone',phoneSchema);
module.exports=Phone;