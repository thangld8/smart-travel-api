const Teacher = require('../models').Teacher;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const Email = require('../utils/emailHelper')

const registerUser = async (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    if (!Email.checkEmail(email)) {
        return res.json({
            'isCreated': false,
            'message': 'invalid email format!'
        }) 
    }
    if (email && password) {
        Teacher.findOne({
            where: {
                email
            }
        }).then(teacher => {
            if (teacher) {
                const error = {
                    'isCreated': false,
                    message: 'Email Address Exists in Database.'
                };
                return res.status(400).json(error);
            }
            const newTeacher = {
                email,
                password
            }
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newTeacher.password, salt, (err, hash) => {
                    if (err) throw err;
                    newTeacher.password = hash;
                    Teacher.create(newTeacher).then(nTeacher => {
                        return res.status(201).json({
                            'isCreated': true,
                            'data': nTeacher
                        })
                    }).catch(err => {
                        return res.status(500).json({
                            'isCreated': false,
                            'message': err.message
                        })
                    })
                })
            })
        })
    } else {
        res.json({
            'isCreated': false,
            'message': 'invalid email/password!'
        })
    }
}

const login = async(req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    let errors = {
        email,
        password
    }
    if (!Email.checkEmail(email)) {
        return res.json({
            'isLogin': false,
            'message': 'invalid email format!'
        }) 
    }
    if(email && password) {
        await Teacher.findOne({
            where: {
                email
            }
        })
        .then(teacher => {
            if (!teacher) {
                errors.email = "No Email Found";
                return res.status(404).json({
                    'isLogin': false,
                    'message': errors.email
                });
            }
            comparePassword(password, teacher, res, errors);
        })
        .catch(err => {
            showErrorResponse(err);
        });
    } else {
        res.json({'error': 'invalid email/password'})
    }
}

function comparePassword(password, teacher, res, errors) {
    
    bcrypt.compare(password, teacher.password)
        .then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: teacher.id,
                    email: teacher.email,
                };
                jwt.sign(payload, config.privateKey, {
                        expiresIn: 7200
                    },
                    (err, token) => {
                        if (err) res.status(500)
                            .json({
                                error: "Error signing token",
                                raw: err
                            });
                        return res.json({
                            'isLogin': true,
                            token: `Bearer ${token}`,
                            email: teacher.email
                        });
                    });
            } else {
                errors.password = "Password is incorrect";
                return res.status(400).json({
                    'isLogin': false,
                    message: errors
                });
            }
        })
        .catch(err => {
            throw err;
            showErrorResponse(err);
        });
}
function showErrorResponse(err) {
    throw err;
    return res.status(500).json({
        "isLogin": false,
        "message": err.message
    })
}

module.exports = {
    registerUser, login
}