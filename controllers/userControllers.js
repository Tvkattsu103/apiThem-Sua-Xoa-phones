require('dotenv').config();
const userServices = require('../services/userServices');

const jwt = require('jsonwebtoken')
const privateKey = process.env.APP_PRIVATE_KEY;

module.exports = {
    login: function (req, res, next) {
        const tenTaikhoan = req.body.tentaikhoan;
        const matKhau = req.body.matkhau;
        // console.log(tentaikhoan)
        userServices.login(tenTaikhoan, matKhau)
            .then(data => {
                const authToken = jwt.sign({ data }, privateKey);
                // console.log(authToken)
                res.set('Token', authToken);
                res.json({ data })
            })
            .catch(error => next(error))
    },
    adduser: function (req, res, next) {
        const body = req.body;
        userServices.addUser(body)
            .then(data => res.send({ status: "success", data }))
            .catch(error => next(error));
    }
}