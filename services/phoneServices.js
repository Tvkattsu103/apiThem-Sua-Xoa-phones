const Phone = require('../models/phone');

module.exports = {
    addDanhba: function(phone) {
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
    getDanhba: function() {
        return Phone.find();
    },
    deleteDanhba: function(phoneId) {
        return new Promise(function(resolve, reject) {
            Phone.deleteOne({_id: PhoneId}, function(err) {
                if (!err) {
                    resolve()
                } else {
                    reject(err)
                }
            })
        })
    }
}