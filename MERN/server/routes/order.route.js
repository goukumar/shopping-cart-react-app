const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order.model')
const CartModel = require('../models/cart.model')

/* GET home page. */
router.get('/', function(req, res, next) {
    OrderModel.find({userid:req.query.email}, function(err, docs){
        if(err) {
            next(err);
        }
        res.send(docs);
    })
   
});

router.post('/', function(req, res, next) {
    var uniqid = req.body.payload.uniqid
    var userid = req.body.payload.userid
    CartModel.find({uniqid:uniqid}, function(err, products){
        if(err) {
            next(err);
        }
        let OrderedList = products;
        var ShippingAddress = req.body.payload.address;

        const e1 = new OrderModel({
            product: OrderedList,
            userid: userid,
            address: ShippingAddress
        });
        e1.save((err, result) =>{
            CartModel.deleteMany({uniqid:uniqid}, (err) =>{
                if(err) {
                    next(err)
                }
                res.status(200).send({
                    "code":200,
                    "message":result._id
                });
             }) 
            
    
        });

    });
});

module.exports = router;