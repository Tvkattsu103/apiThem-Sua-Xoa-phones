require('dotenv').config();
const userServices = require('../services/userServices');

const jwt = require('jsonwebtoken')
const privateKey = process.env.APP_PRIVATE_KEY;

module.exports={
    login: function(req, res, next) {
        const tentaikhoan = req.body.tentaikhoan;
        const matkhau = req.body.matkhau;
        // console.log(tentaikhoan)
        userServices.login(tentaikhoan, matkhau)
        .then(data => {
            const authToken = jwt.sign({data}, privateKey);
            // console.log(authToken)
            res.set('Token', authToken);
            res.json({data})
        })
        .catch(error => next(error))
    }
}