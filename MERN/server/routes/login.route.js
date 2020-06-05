const jwt = require('jsonwebtoken');
import config from '../config'; // get our config file
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
/* GET home page. */
router.post('/', function(req, res, next) {
        User.find({email:req.body.payload.email},(err, result)=>{
            if(result.length > 0 && bcrypt.compareSync(req.body.payload.password, result[0].password, null)) {
                const JWTToken = jwt.sign({
                    email: result[0].email,
                    _id: result[0]._id
                  },
                  config.secret,
                   {
                     expiresIn: '24h'
                   });

                res.status(200).json({
                    code:200,
                    isAuthed: true,
                    email: result[0].email,
                    user: result[0].firstname,
                    token: JWTToken
                })
            } else if(result.length && !bcrypt.compareSync(req.body.payload.password, result[0].password, null)){
                res.send({
                    code:400,
                    isAuthed: false,
                    message:"Invalid Password!"
                })
            } else {
                res.send({
                    code:400,
                    message:"This User '"+ req.body.payload.email +"' does not Exist!"
                })
            }
        })
    
  
});

module.exports = router;