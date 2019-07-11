const Teacher = require('../models').Teacher;
const Student = require('./student');

const registerStudents = (req, res) => {
    const body = req.body;
    const email = body.teacher;
    const students = body. students;
    console.log(1111, email)
    Student.createStudent(email, students, res);
}

const suspendStudent = (req, res) => {
    console.log(req.user)
    const body = req.body;
    const emailStudent = body.student;
    const emailTeacher = req.user.email;
    Student.suspendStudent(emailStudent, emailTeacher, res);
}

module.exports = {
    registerStudents, suspendStudent
}