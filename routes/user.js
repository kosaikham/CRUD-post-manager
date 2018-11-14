const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
var {authenticate} = require('../middleware/authenticate');

const User = require('../models/User');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user){
            return res.status(400).json({
                message: 'Email already exists'
            })
        }else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err)
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err)
                        else{
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    const payload = {
                                        id: user.id,
                                        name: user.name
                                    }
                                    jwt.sign(payload, 'secret', {
                                        expiresIn: 3600
                                    }, (err, token) => {
                                        if(err) console.error('There is some error in token', err);
                                        else {
                                            res.json({
                                                id: payload.id,
                                                name: payload.name,
                                                success: true,
                                                token: token,
                                                expiresIn: 3600
                                            })
                                        }
                                    })
                                })
                        }
                    })
                }
            })
        }
    })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user){
                errors.message = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    id: payload.id,
                                    name: payload.name,
                                    success: true,
                                    token: token,
                                    expiresIn: 3600
                                })
                            }
                        })
                    }
                    else {
                        errors.message = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                })
        })
})

router.get('/me', authenticate, (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router;