const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const CartModel = require('../models/cart.model')
const ProductModel = require('../models/product.model')

/* GET home page. */
const parseCookies = (request) =>{
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
router.get('/', function(req, res, next) {
    const param = JSON.parse(req.query.payload)
//    CartModel.aggregate([ 
//        {
//             $lookup:{
//                 from: 'products',
//                 localField: 'productid',
//                 foreignField: '_id',
//                 as:'products'
//             }
//         }
//    ])
//    .exec(function(err, data){
//         if(err) {
//             next(err);
//         }
//         console.log(data)
//    })

    
    CartModel.find({uniqid:param.uniqid}, function(err, cart){
        if(err) {
            next(err);
        }
        var list = []
        cart.forEach((item, index) => {
            list.push(item.productid)
        })
        ProductModel.find({_id:list},function(err, products){
            res.status(200).send({
                cart:cart,
                products:products
            })
        })
    })
   
});

router.put('/', function(req, res, next) {
    const uniqid = parseCookies(req).uniqid;
    const pid = req.body.payload.product;
    CartModel.updateOne({uniqid:uniqid, productid: pid}, {qty: req.body.payload.qty}, function(err, item){
        if(err) {
            next(err)
        }
            res.status(200).send('Cart Category Upated');
    });
});
router.delete('/', function(req, res, next) {
    // res.send('Employees POST API coming soon');
    const uniqid = parseCookies(req).uniqid;
    const pid = req.body.payload.product;

    CartModel.deleteOne( {uniqid:uniqid, productid: pid}, (err) =>{
        if(err) {
            next(err)
        }
        res.status(200).send('Product Removed');
    })  
  
});
router.post('/', function(req, res, next) {

    const uniqid = parseCookies(req).uniqid;
    const pid = req.body.payload.product;
    CartModel.findOne({uniqid:uniqid, productid: pid}, function(err, item){
        let qty = req.body.payload.qty;
        if(item){
            qty = item.qty + 1
        } 
       CartModel.updateOne(
            {uniqid: uniqid, productid:req.body.payload.product},
            {
                uniqid: uniqid,
                qty: qty,
                productid: req.body.payload.product,
                userid:req.body.payload.userid
            },
            {
                upsert: true
            },
            (err, doc)=>{
                if(err) {
                    next(err)
                }
                if(doc.ok) {
                    CartModel.find({productid: pid})
                    .exec((err, docs)=>{
                        if(err) {
                            next(err)
                        }
                        res.status(200).send(docs);
                    })
                } else {
                    res.status(500).send('Internal Server Error')
                }

            }        

        )

    });


});



module.exports = router;