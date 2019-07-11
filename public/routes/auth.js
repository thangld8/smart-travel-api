const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Teacher = require('../controller/teacher');
const crypto = require('crypto-browserify');
const client_secret = 'abcd';
const getRawBody = require('raw-body');

router.post('/register', (req, res) => {
    Teacher.registerUser(req, res);
});

router.post('/login',async (req, res) => {
    Teacher.login(req, res);
});

router.get('/', (req, res) => {
    res.json({
        "message": "Hi"
    })


})

module.exports = router;