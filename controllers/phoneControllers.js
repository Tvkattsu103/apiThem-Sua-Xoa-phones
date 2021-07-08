require('dotenv').config();
const phoneServices = require('../services/phoneServices');
const jwt = require('jsonwebtoken')
const privateKey = process.env.APP_PRIVATE_KEY;

module.exports={
    login: function(req, res, next) {
        const tentaikhoan = req.body.tentaikhoan;
        const matkhau = req.body.matkhau;
        
        phoneServices.login(tentaikhoan, matkhau)
        .then(data => {
            const authToken = jwt.sign({data}, privateKey);
            console.log(authToken)
            res.set('Token', authToken);
            res.json({data})
        })
        .catch(error => next(error))
    },
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
