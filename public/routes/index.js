/*
 * @Author: ThangLD
 * @Email: ThangLDse03529@gmail.com
 * @Account: Routes
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const TeacherAuth = require('../controller/teacher-auth');
const StudentCommonController = require('../controller/student-common');
const crypto = require('crypto')
const client_secret = '<your secret key here>'

router.post('/register', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    TeacherAuth.registerStudents(req, res)
});

router.get('/heal-check', (req, res) => {
    res.json({
        "message": 'Hi, yo'
    });
})

router.get('/commonstudents', (req, res) => {
    StudentCommonController.getListStudentByTeachersEmail(req, res);
})

router.post('/suspend', (req, res) => {
    TeacherAuth.suspendStudent(req, res);
})

router.post('/retrievefornotifications', (req, res) => {
    StudentCommonController.getListStudentForNotifications(req, res);
})

module.exports = router;
// router.method('/path', passport.authenticate('jwt', {session: false}), (req, res)=> {res.json(req)});