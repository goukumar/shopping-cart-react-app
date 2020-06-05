import merge from 'merge'
const express = require('express');
const router = express.Router();

/******Routes ********/
import NavigationRoute from './routes/navigation.routes';
import ProductRoute from './routes/product.routes';
/******End ***********/

/* GET home page. */
router.get('/', function(req, res, next) {
  NavigationRoute.find((err, result)=>{
        if(err) {
            next(err);
        }
        res.json(result);
        ProductRoute.find()
    });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    const e1 = new Navigation(req.body);
    e1.save((err, result) =>{
        res.send('Navigation saved');
    })
  
});

module.exports = router;