module.exports = function(req, res, next) {
    try {
        const body = req.body;
        const tendanhba = body.tendanhba;
        const sdt = body.sdt;
        
        if (tendanhba.length > 0 &&
            sdt.length == 10 && 
            sdt.charAt(0) == '0'
        ) {
            next();
        } else {
            throw new Error("Validate failed")
        }

    } catch (e) {
        res.status(401).json(
            {
                status: "failed",
                message: "Validate failed",
                data: []
            }
        )
    }
}
