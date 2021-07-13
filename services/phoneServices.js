const Phone = require('../models/phone');

module.exports = {
    addContact: function (phone) {
        return new Promise(function (res, rej) {
            const newPhone = new Phone(phone);
            newPhone.save(function (err) {
                if (err) {
                    rej({ message: "error" })
                } else {
                    res(newPhone)
                }
            });
        });
    },
    getContact: function () {
        return Phone.find();
    },
    deleteContact: function (phoneId) {
        return new Promise(function (resolve, reject) {
            Phone.deleteOne({ _id: phoneId }, function (err) {
                if (!err) {
                    resolve()
                } else {
                    reject(err)
                }
            })
        })
    },
    updateContact: function (phoneId, data) {
        return new Promise(function (resolve, reject) {
            Phone.updateOne({ _id: phoneId }, data, function (err) {
                if (!err) {
                    resolve()
                } else {
                    reject(err)
                }
            })
        })
    }
}