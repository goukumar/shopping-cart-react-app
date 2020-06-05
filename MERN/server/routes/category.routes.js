const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/product.category.model')
/* GET home page. */
router.get('/', function(req, res, next) {
    CategoryModel.find((err, result)=>{
        if(err) {
            next(err);
        }
        res.json(result);
    });
});

router.post('/', function(req, res, next) {
    const e1 = new CategoryModel(req.body);
    e1.save((err, result) =>{
        res.send('Product Category saved');
    })
  
});

module.exports = router;