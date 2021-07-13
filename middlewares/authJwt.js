const jwt = require("jsonwebtoken");

require('dotenv').config();
const privateKey = process.env.APP_PRIVATE_KEY;

module.exports = function (req, res, next) {
    const token = req.header('Token')
    if (!token)
        return res.status(401).json({ message: "Auth Error" });
    try {
        const decoded = jwt.verify(token, privateKey);
        if (decoded.data) {
            res.locals.authUser = decoded.data;
            next();
            return;
        }
        return res.status(401).json({ message: "Auth Error" });

    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}