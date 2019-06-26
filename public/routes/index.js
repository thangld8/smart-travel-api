const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../controller/user');
const crypto = require('crypto')
const client_secret = '<your secret key here>'

router.post('/register', (req, res) => {
    User.creatUser(req, res)
});

router.get('/hi', (req, res) => {
    console.log(3333334411111)
    res.json({
        "message": 'Hi, yo'
    });
})
router.post('/login', (req, res) => {
    User.login(req, res)
});

module.exports = router;
// router.method('/path', passport.authenticate('jwt', {session: false}), (req, res)=> {res.json(req)});