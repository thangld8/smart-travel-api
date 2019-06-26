const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/config.json');

async function creatUser(req, res) {
    const body = req.body;
    if (body.emailAddress && body.name && body.password && body.userName) {
        User.findOne({
            emailAddress: req.body.emailAddress
        })
        .then(user => {
            if (user) {
                let error = {
                    error: '400',
                    message: 'Email Address Exists in Database.'
                };
                return res.status(400).json(error);
            } else {
                const newUser = new User({
                    name: req.body.name,
                    emailAddress: req.body.emailAddress,
                    password: req.body.password,
                    userName: body.userName
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save().then(user => res.json(user))
                                .catch(err => res.status(400).json(err));
                        });
                });
            }
        });
    } else {
        res.json({'error': 'invalid email/name/password/userName'})
    }
}

async function login(req, res) {
    const body = req.body;
    const emailAddress = body.emailAddress;
    const password = body.password;
    if(emailAddress && password) {
        User.findOne({
            emailAddress
        })
        .then(async user => {
            if (!user) {
                errors.emailAddress = "No Account Found";
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user._id,
                            name: user.name,
                        };
                        jwt.sign(payload, config.privateKey, {
                                expiresIn: 3600
                            },
                            (err, token) => {
                                if (err) res.status(500)
                                    .json({
                                        error: "Error signing token",
                                        raw: err
                                    });
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`,
                                    name: user.name
                                });
                            });
                    } else {
                        errors.password = "Password is incorrect";
                        res.status(400).json(errors);
                    }
                }).catch(err => res.json({"error": err}));
        })
        .catch(err => res.json({"error": err}));
    } else {
        res.json({'error': 'invalid email/password'})
    }
}

module.exports = {
    creatUser, login
}