const Phone = require('../models/phone');
const User = require('../models/user');

module.exports = {
    login: function(tentaikhoan, matkhau) {
        let userCache;
        return User.findOne({tentaikhoan: tentaikhoan, matkhau})
            .then(userFound => {
                userCache = userFound;
                console.log(userFound)
                const phoneId = userFound.phone_id;
                return Phone.findOne({_id: phoneId})
            })
            .then(phone => {
                console.log(userCache._doc)
                const userData = Object.assign({phone: phone.phone}, userCache._doc)
                delete userData.matkhau
                delete userData.phone_id
                return Promise.resolve(userData)
            })
    }
}