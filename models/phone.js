const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    tendanhba: String,
    sdt: String
});
const phone = mongoose.model('Phone', phoneSchema);
module.exports = phone;