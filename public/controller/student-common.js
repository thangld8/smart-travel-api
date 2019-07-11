const Student = require('../models').Student;
const Util = require('../utils/emailHelper');

const getListStudentByTeachersEmail = async (req, res) => {
    const reqQuery = req.query;
    let result;
    if (typeof(reqQuery.teacher) === 'string') {
        result = await getListStudentByAnEmail(reqQuery.teacher, res);
    } else if (typeof(reqQuery.teacher) === 'object') {
        result = await getListStudentByMultipleEmail(reqQuery.teacher);
    }

    if (result) {
        return res.status(200).json(result);
    }

    return res.status(500).json({});
}

const getListStudentByAnEmail = async (teacherEmail) => {
    return new Promise((resolve, reject) => {
        Student.findAll({
            where: {
                registedBy: teacherEmail,
                isSubspend: false
            }
        }).then(data => {
            let res = {
                isSuccess: true,
                students: [], 
                message: ''
            };
            if (data.length > 0) {
                data.forEach(element => {
                    res.students.push(element.dataValues.email);
                });
                resolve(res);
            } else {
                res.isSuccess = false;
                res.message = 'Cannot found any student for: '+teacherEmail;
                resolve(res);
            }
        }).catch(err => {
            throw err;

            reject({
                isSucess: false,
                message: 'Cannot get list of student now'
            })
        })
    })
}

const getListStudentByMultipleEmail = async (teacherEmails) => {
    return new Promise((resolve, reject) => {
        Student.findAll({
            where: {
                registedBy: teacherEmails,
                isSubspend: false
            }
        }).then(data => {
            let res = {
                isSuccess: true,
                students: [],
                message: ''
            };
            if (data.length > 0) {
                data.forEach(element => {
                    res.students.push(element.dataValues.email);
                });
                res.students = Util.getDuplicateEmail(res.students);
                resolve(res);
            } else {
                res.isSuccess = false;
                res.message = 'Cannot found any student who registered by '+teacherEmails;
                resolve(res)
            }
            
        }).catch(err => {
            throw err;
            reject({
                isSuccess: false,
                message: 'Cannot get list of student now'
            })
        })
    })
}

const getListStudentForNotifications = async (req, res) => {
    const body = req.body;
    const notification = body.notification;
    const emailTeacher = req.user.email;
    const studentEmails = Util.getListEmailFromNotification(notification);
    const getData = await Promise.all([getListStudentFromNotification(studentEmails), getListStudentByAnEmail(emailTeacher)]);
    const flagSuccess = getData[0].isSuccess || getData[1].isSuccess;
    const flagNonSuccess = !getData[0].isSuccess || !getData[1].isSuccess;
    let resData = {
        isSuccess: true,
        recipients: [],
        message: ''
    }

    if (flagSuccess) {
        if (getData[0].students.length > 0 && getData[1].students.length > 0) {
            const resRecipients = [...getData[1].students, ...filterEmail(getData)]
            resData.recipients = resRecipients;
        } else if (getData[0].students.length > 0 && getData[1].students.length <= 0) {
            resData.recipients = filterEmail(getData);
        } else {
            resData.recipients = getData[1].students;
        }
    } else if (flagNonSuccess) {
        if (getData[0].message || getData[1].message) {
            resData.message = getData[0].message || getData[1].message;
        }
    }
    else {
        resData.message = 'Cannot process your request now!';
    }

    return flagSuccess ? res.status(200).json(resData) : res.status(500).json(resData);
}

const filterEmail = (getData) => {
    let filteredEmail0 = getData[0].students.filter(student => {
        return getData[1].students.indexOf(student.email) < 0;
    });
    filteredEmail0 = Util.getUniqEmailWithRegistered(filteredEmail0);

    return filteredEmail0;
}

const getListStudentFromNotification = async (studentEmails) => {
    return new Promise((resolve, reject) => {
        Student.findAll({
            where: {
                email: studentEmails,
                isSubspend: false
            }
        }).then(data => {
            let res = {
                isSuccess: true,
                students: [],
                message: ''
            };
            if (data.length > 0) {
                data.forEach(element => {
                    res.students.push({
                        email: element.dataValues.email,
                        registedBy: element.dataValues.registedBy
                    });
                });
                // res.students = res.students.filter((item, pos) => {
                //     return res.students.indexOf(item) === pos;
                // });
                resolve(res);
            } else {
                res.isSuccess = false;
                res.message = 'Cannot found any student match';
                resolve(res)
            }
            
        }).catch(err => {
            throw err;
            reject({
                isSuccess: false,
                message: 'Cannot get list of student now'
            })
        })
    });
}

module.exports = {
    getListStudentByTeachersEmail, getListStudentForNotifications
}