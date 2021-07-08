const Phone = require('../models/phone');
const User = require('../models/user');

module.exports = {
    login: function(tentaikhoan, matkhau) {
        let userCache;
        return User.findOne({tentaikhoan: tentaikhoan, matkhau})
            .then(userFound => {
                console.log(userFound)
                userCache = userFound;
                const phoneId = userFound.phone_id;
                return Phone.findOne({_id: phoneId})
            })
            .then(phone => {
                const userData = Object.assign({phone: phone.phone}, userCache._doc)
                delete userData.matkhau
                delete userData.phone_id
                return Promise.resolve(userData)
            })
    },
    addContact: function(phone) {
        return new Promise(function(res, rej){
            const newPhone = new Phone(phone);
            newPhone.save(function (err) {
                if (err) {
                    rej({message:"error"})
                } else {
                    res(newPhone)
                }
            });
        });
    },
    getContact: function() {
        return Phone.find();
    },
    deleteContact: function(phoneId) {
        return new Promise(function(resolve, reject) {
            Phone.deleteOne({_id: phoneId}, function(err) {
                if (!err) {
                    resolve()
                } else {
                    reject(err)
                }
            })
        })
    },
    updateContact: function(phoneId, data) {
        return new Promise(function(resolve, reject) {
            Phone.updateOne({_id: phoneId}, data, function(err) {
                if (!err) {
                    resolve()
                } else {
                    reject(err)
                }
            })
        })
    }
}