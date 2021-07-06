const Phone = require('../models/phone');

module.exports = function(req, res, next) {
    try {
        const sodt = req.body.sdt;
        if (sodt.length == 10 && sodt.charAt(0) == '0') {
            Phone.findOne({sdt: sodt})
            .then(data => {
                if (data) {
                    res.status(401).json(
                        {status: "failed",
                         message: "Phone is exist",
                         data: []
                    })
                } else {
                    next()
                }
                
            })
            
        } else {
            res.status(401).json({status: "failed", message: "Phone number not invalid"})
        }
    } catch (e) {
        res.status(401).json({status: "failed", message: e.message})
    }
    
    
}