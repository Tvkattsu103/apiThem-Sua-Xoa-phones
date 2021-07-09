const Phone = require('../models/phone');
const User = require('../models/user');

module.exports = {
    login: function(tentaikhoan, matkhau) {
        let userCache;
        return User.findOne({tentaikhoan: tentaikhoan, matkhau})
            .then(userFound => {
                userCache = userFound;
                const phoneId = userFound.phone_id;
                return Phone.findOne({_id: phoneId})
            })
            .then(phone => {
                console.log(phone)
                const userData = Object.assign({sdt: phone.sdt}, userCache._doc)
                console.log(userData)
                delete userData.matkhau
                delete userData.phone_id
                return Promise.resolve(userData)
            })
    }
}