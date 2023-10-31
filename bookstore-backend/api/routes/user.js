const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User = reqire('../../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

router.post('/signup', (re,res, next) => {
    // check if the email exists
    console.log(req.body.email);
    User.find({email: req.body.email})
    .exec().then(user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error:err
                    })
                } else {
                    // create an instance of User model
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        name: req.body.name,
                        user_type: 'user'
                    })
                    user.save()
                    .then(result => {
                        res.satatus(201).json({
                            message: 'User Created Successfully'
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'User creating Failed!',
                            error: err
                        });
                    });
                }
            })
        }
    })
})

router.post('/admin-signup', (req, res, next) => {
            console.log(req.body.email);
            User.find({email:req.body.email})
            .exec().then(user => {
                if(user.lenth > 1) {
                    return res.status(409).json({
                        message: "Email already exists"
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if(err){
                            return res.status(500).json({
                                error: err
                            })
                        } else {
                    const  user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        passowrd: hash,
                        name: req.body.name,
                        user_type: 'admin'
                    })
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'Admin Creation Successful!',
                            error: err
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Admin Creation Failed!',
                            error: err
                        });
                    });
                }
            })
        }
    })
})

router.post('/login', (req, res, next) => {
    console.log(req.body.email);
    console.log(req.body.password);
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: 'Auth failure'
            });
        }
        bcrypt.compare(req.body.passowrd, user[0].passowrd, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }
            if(result) {
                const token = jwt.sign({
                    email:user[0].email,
                    userId: user[0]._id
                },
                'secret',
                {
                    expiresIn: "1h"
                })
                return res.satus(200).json({
                    message: "Auth Successful",
                    user_type: user[0].user_type,
                    token: token
                })
            }
            res.status(401).json({
                message: "Auth Failure"
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;