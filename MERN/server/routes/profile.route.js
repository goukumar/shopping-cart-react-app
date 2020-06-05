const jwt = require('jsonwebtoken');
import config from '../config'; // get our config file
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
/* GET home page. */
router.get('/', function(req, res, next) {
    User.findOne({email: req.query.email},(err, result)=>{
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
    User.updateOne({email:req.body.payload.email},req.body.payload, (err, result)=>{
        if(err) {
            next(err)
        }
        if(result.ok) {
            res.status(200).json({
                code:200,
                message: "Profile Updated Successfully"
            })
        } 
    })

});
router.post('/', function(req, res, next) {
        User.find({email:req.body.payload.email},(err, result)=>{
            if(result.length) {
                res.status(200).json({
                    code:200,
                    isAuthed: true,
                    payload:  result[0].firstname,
                    token: JWTToken
                })
            } 
        })
  
});

module.exports = router;