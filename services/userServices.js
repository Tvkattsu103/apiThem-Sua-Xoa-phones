const Phone = require('../models/phone');
const User = require('../models/user');

module.exports = {
    login: function (tenTaikhoan, matKhau) {
        console.log(tenTaikhoan)
        console.log("ttk")
        let userCache;
        return User.findOne({ tentaikhoan: tenTaikhoan})
            .then(userFound => {
                console.log(userFound.phone_id)
                userCache = userFound;
                const phoneId = userFound.phone_id;
                return Phone.findOne({ _id: phoneId })
            })
            .then(phone => {
                console.log(phone)
                const userData = Object.assign({ sdt: phone.sdt }, userCache._doc)
                console.log(userData)
                delete userData.matkhau
                delete userData.phone_id
                return Promise.resolve(userData)
            })
    },
    addUser: function (user) {
        return new Promise(function (res, rej) {
            const newUser = new User(user);
            newUser.save(function (err) {
                if (err) {
                    rej({ message: "error" })
                } else {
                    res(newUser)
                }
            });
        });
    }
}