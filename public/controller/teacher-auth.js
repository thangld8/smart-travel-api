/*
 * @Author: ThangLD
 * @Email: ThangLDse03529@gmail.com
 * @Account Controller - teacher-auth.js
 */

const Teacher = require('../models').Teacher;
const Student = require('./student');

const registerStudents = (req, res) => {
    const body = req.body;
    const email = body.teacher;
    const students = body. students;
    Student.createStudent(email, students, res);
}

const suspendStudent = (req, res) => {
    const body = req.body;
    const emailStudent = body.student;
    const emailTeacher = req.user.email;
    Student.suspendStudent(emailStudent, emailTeacher, res);
}

module.exports = {
    registerStudents, suspendStudent
}