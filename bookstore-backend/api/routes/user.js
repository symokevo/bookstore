const express = require('express');
const router = express.router();

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