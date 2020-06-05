const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const CategoryModel = require('../models/product.category.model')
const ProductModel = require('../models/product.model')
/* GET home page. */
router.get('/', function(req, res, next) {
    const Category = CategoryModel.findOne({category:req.query.payload}, function(err, category){
        if(err) {
            next(err);
        }
        ProductModel.find({category: category._id},(err, result)=>{
            if(err) {
                next(err);
            }
            res.send(result);
        });
    })
   
});

router.post('/', function(req, res, next) {
    const Category = CategoryModel.findOne({category:req.body[i].category}, function(err, category){
        if(err) {
            next(err);
        }
        const e1 = new ProductModel({
            name: req.body[j].name,
            price: req.body[j].price,
            image: req.body[j].image,
            category: category._id
        });
        e1.save((err, result) =>{
            if(err) {
                next(err);
            }
            res.send(result);
        })
    
    });
   
});

module.exports = router;