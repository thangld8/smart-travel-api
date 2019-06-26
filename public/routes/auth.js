const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../controller/user');
const crypto = require('crypto-browserify')
const client_secret = 'abcd';
const getRawBody = require('raw-body');

router.post('/register', (req, res) => {
    User.creatUser(req, res)
});

router.post('/login',async (req, res) => {
    // const rawB = await getRawBody(req, {
    //     inflate: true,
    //     limit: '1mb',
    //     type: 'application/octet-stream'
    //   }, function (err, string) {
    //     if (err) return console.log(err);
    //     console.log(332211, string);
    //   });
    const tBf = Buffer.from(req.body.toString());
      const hash = crypto
    .createHmac('sha256', client_secret)
    .update(req.body.toString(), 'utf8', 'hex')
    .digest('base64')
    console.log('33333333',  hash);
    User.login(req, res)
});

router.get('/', (req, res) => {
    const body = "{a: b}";
    const pass = "thang";
    const AES_STANDARD = "aes256";
    try {
        const hash = crypto
    .createHmac('sha256', client_secret)
    .update(body, 'utf8', 'hex')
    .digest('base64')
    console.log('33333333',  hash)

    const SEncrypt = this.encrypt(body, pass, AES_STANDARD);
    console.log(2233, SEncrypt);
    const SDecrypt = this.decrypt(SEncrypt, pass, AES_STANDARD);
    console.log(2244, SDecrypt);
    } catch (error) {
        console.log('err', error)
    }
    res.json({
        "message": "Hi"
    })


})
exports.encrypt = function(s, password, AES_STANDARD) {
    let buffer = new Buffer(s, "utf8");
    let cipher = crypto.createCipher(AES_STANDARD, password)
    let crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return crypted.toString("hex");
};
exports.decrypt = function(s, password, AES_STANDARD) {
    let buffer = new Buffer(s, "hex");
    let decipher = crypto.createDecipher(AES_STANDARD, password)
    let dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return dec.toString("utf8");
};

module.exports = router;