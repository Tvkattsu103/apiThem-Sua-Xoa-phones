
const jwt = require('jsonwebtoken');
const phoneServices = require('../services/phoneServices')
// const userModel= require('../models/phone');
module.exports={
    getdanhba: function(req, res, next) {
        phoneServices.getDanhba()
        .then(data => res.send({data}))
        .catch(error => next(error));
    },
    adddanhba: function(req, res, next) {
        const body = req.body;
        phoneServices.addDanhba(body)
        .then(data => res.send({status: "success", data}))
        .catch(error => next(error));
    },
    selectdanhba: async(req,res)=>{
        const phone = await userModel.find({});
        try {
            res.send(phone);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updatedanhba: async(req,res)=>{
        try {
            const phone = await userModel.findByIdAndUpdate(req.params.id,req.body);
            await userModel.save();
            res.send(phone);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    deletedanhba: function(req, res, next) {
        const phoneId = req.params.id;
        phoneServices.deleteDanhba(phoneId)
        .then(() => res.send({message: "success"}))
        .catch(error => next(error));
    }
}
