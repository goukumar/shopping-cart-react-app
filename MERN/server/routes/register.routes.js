const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
/* GET home page. */
const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
router.post('/', function(req, res, next) {
    
    if(req.body.type === 'USER_REGISTER_ASYNC') {
        User.findOne({email:req.body.payload.email},(err, result)=>{
            if(result !== null) {
                    res.send({
                        "code":400,
                        "message":"This User '"+ req.body.payload.email +"' Alreay Exist!"
                    })
                } else {
                    let row = req.body.payload;
                    row.password = generateHash(row.password);
                    const e1 = new User(row);
                    e1.save((err, result) =>{
                        res.send({
                            "code":200,
                            "message":"user registered sucessfully"
                        });
                    })
                }
            })
    }
   
});

module.exports = router;