const mongoose = require('mongoose');
const Phone = require('./phone');
const Schema = mongoose.Schema;

const userSchema=new Schema({
    tentaikhoan: String,
    matkhau: String,
    phone_id: {type: Schema.Types.ObjectId, ref: 'Phone'}
});
const user = mongoose.model('User',userSchema);
module.exports=user;