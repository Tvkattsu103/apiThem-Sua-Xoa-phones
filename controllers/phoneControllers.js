require('dotenv').config();
const phoneServices = require('../services/phoneServices')

module.exports={
    getcontact: function(req, res, next) {
        phoneServices.getContact()
        .then(data => res.send({data}))
        .catch(error => next(error));
    },
    addcontact: function(req, res, next) {
        const body = req.body;
        phoneServices.addContact(body)
        .then(data => res.send({status: "success", data}))
        .catch(error => next(error));
    },
    updatecontact: function(req, res, next) {
        const phoneId = req.params.id;
        phoneServices.updateContact(phoneId, req.body)
        .then(data => res.send({status: "success", data}))
        .catch(error => next(error));
    },
    deletecontact: function(req, res, next) {
        const phoneId = req.params.id;
        phoneServices.deleteContact(phoneId)
        .then(() => res.send({message: "success"}))
        .catch(error => next(error));
    }
}
