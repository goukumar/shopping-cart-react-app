const express = require('express');
const router = express.Router();
const Navigation = require('../models/navigation.model')
/* GET home page. */
router.get('/', function(req, res, next) {
    Navigation.find((err, result)=>{
        if(err) {
            next(err);
        }
        res.json(result);
    });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    const e1 = new Navigation(req.body);
    e1.save((err, result) =>{
        res.send('Navigation saved');
    })
  
});
router.put('/', function(req, res, next) {
    const e1 = new Navigation(req.body);
    Navigation.updateOne({lebel: req.body.category}, req.body, (err) =>{
        if(err) {
            next(err)
        }
        res.send('Navigation updated');
    })  
  
});
module.exports = router;