const mongoose = require('mongoose');
const Phone = require('./phone');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema=new Schema({
    tentaikhoan: String,
    matkhau: String,
    phone_id: {type: Schema.Types.ObjectId, ref: 'Phone'}
});

//mã hóa password
userSchema.pre("save", function(next){
    if(!this.isModified("matkhau")) return next();
    bcrypt.hash(this.matkhau, 10, (err,passwordHash) =>{
        if(err) return next(err);
        this.matkhau = passwordHash;
        console.log(passwordHash)
        next();
    })
})

userSchema.methods.verifyPassword = function (matkhau,cb){
    bcrypt.compare(matkhau, this.matkhau, (err, isMatch) => {
        console.log(isMatch)
        if(err) return cb(err);
        else{
            if(!isMatch) return cb(null, isMatch);
            return cb(null,this);
        }
    })
}

const user = mongoose.model('User',userSchema);
module.exports=user;