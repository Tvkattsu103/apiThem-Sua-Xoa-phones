const mongoose = require('mongoose');
const phoneSchema=new mongoose.Schema({
    tendanhba: String,
    sdt: String
});
const phone = mongoose.model('Phone',phoneSchema);
module.exports=phone;