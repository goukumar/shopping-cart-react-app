const express = require('express');
const router = express.Router();
const Address = require('../models/address.model')
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query.email);
    Address.findOne({userid: req.query.email},(err, result)=>{
        if(err) {
            next(err)
        }
        if(result) {
            res.status(200).json({
                code:200,
                payload: result,
            })
        } 
    })

});
router.put('/', function(req, res, next) {
    Address.updateOne({email:req.body.payload.email},req.body.payload, (err, result)=>{
        if(err) {
            next(err)
        }
        if(result.ok) {
            res.status(200).json({
                code:200,
                message: "Address Updated Successfully"
            })
        } 
    })

});
router.post('/', function(req, res, next) {
    Address.find({email:req.body.payload.email})
        .exec((err, doc)=>{
            if(err) {
                next(err)
            }
            let row = req.body.payload;
            const e1 = new Address(row);
            e1.save((err, result) =>{
                res.status(200).send({
                    "code":200,
                    "address": result,
                    "message":"Address added sucessfully"
                });
            })
        })
  
});

module.exports = router;