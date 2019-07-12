/*
 * @Author: ThangLD
 * @Email: ThangLDse03529@gmail.com
 * @Account Controller - student.js
 */

const Student = require("../models").Student;
const emailHelper = require("../utils/emailHelper");

/**
* @param  {} (registedTeacher, listedStudent, res)
* create student from listedStudent and registed Teacher
*/
const createStudent = async (registedTeacher, listedStudent, res) => {
    let dataStudent = [];
    let resData = [];
    listedStudent.forEach(student => {
        dataStudent.push({
            email: student,
            isSubspend: false,
            registedBy: registedTeacher
        })
    });
    await registerStudent(dataStudent, resData);

    if (resData) {
        return res.status(200).json(resData);
    }

    return res.status(500).json({
        'isRegisted': false,
        'message': 'Cannot register students now'
    });
    
}

/**
* @param  {} (dataStudent, resData)
* trigger addUser function
*/
const registerStudent = async (dataStudent, resData) => {
    await Promise.all(dataStudent.map(async dtStudent => {
        try {
            const result = await addUser(dtStudent)
            resData.push(result);
        } catch (error) {
            throw error;
            return error.message;
        }
    }));
}

/**
* @param  {} (emailStudent, emailTeacher, res)
* suspend student
*/
const suspendStudent = async (emailStudent, emailTeacher, res) => {
    const waitingForProcess = await Promise.all([findStudentForSuspendByEmail(emailStudent, emailTeacher), findStudentByEmail(emailStudent)]);
    let dataRes = {
        isSuccess: true,
        message: `The Student ${emailStudent} is suspended!`
    }
    if (waitingForProcess[0].isSuccess && waitingForProcess[1].isSuccess && waitingForProcess[0].data) {
        return res.status(204).json({});
    } else if (waitingForProcess[0].isSuccess && waitingForProcess[1].isSuccess && waitingForProcess[0].message) {
        dataRes.isSuccess = false;
        dataRes.message = `You only can suspend who not suspended and regiestered by ${emailTeacher}`;
        return res.status(200).json(dataRes);
    } else {
        dataRes.isSuccess = false;
        dataRes.message = `Cannot find ${emailStudent} now, please try again`;
        return res.status(500).json(dataRes);
    }
}

/**
* @param  {} (emailStudent, emailTeacher)
* find student for suspend student
*/
const findStudentForSuspendByEmail = async (emailStudent, emailTeacher) => {
    return new Promise((resolve, reject) => {
        Student.findOne({
            where: {
                email: emailStudent,
                registedBy: emailTeacher,
                isSubspend: false
            }
        }).then(student => {
            console.log(student)
            if (student) {
                student.update({
                    isSubspend: true
                }).then(data => {
                    if (data) {
                        return resolve({
                            isSuccess: true,
                            data
                        })
                    }
                }).catch(err => {
                    throw err;
                    return reject({
                        isSuccess: false,
                        message: `you cannot suspend ${emailStudent} now, please try again`
                    })
                })
            } else {
                return resolve({
                    isSuccess: true,
                    message: 'Cannot found any student who registered by '+emailTeacher
                })
            }
        }).catch(err => {
            throw err;
            return reject({
                isSuccess: false,
                message: `Cannot find ${emailStudent} now, please try again`
            })
        })
    });
} 

/**
* @param  {} emailStudent
* find student by email
*/
const findStudentByEmail = async (emailStudent) => {
    return new Promise((resolve, reject) => {
        Student.findAll({
            where: {
                email: emailStudent
            }
        }).then(data => {
            console.log(data)
            if (data.length > 0) {
                resolve({
                    isSuccess: true
                })
            } else {
                resolve({
                    isSuccess: true,
                    student: 0
                })
            }
        }).catch(err => {
            throw err;
            reject({
                isSuccess: false
            })
        })
    });
}

/**
* @param  {} (emailStudent, emailTeacher)
* Add User into Database
*/
const addUser = async (dtStudent) => {
    return new Promise((resolve, reject) => {
        Student.findOrCreate({
            where: {
                email: dtStudent.email,
                registedBy: dtStudent.registedBy
            },
            defaults: dtStudent
        }).then(async ([user, created]) => {
            if (!created) {
                await Student.findAll({
                    where: {
                        email: dtStudent.email,
                        isSubspend: false,
                        registedBy: dtStudent.registedBy
                    }
                }).then(stu => {
                    if (stu) {
                        try {
                            stu.map(async studentInfo => {
                                //get list of registed student email from teacher
                                const registedEmailByTeachers = emailHelper.splitemail(studentInfo.dataValues.registedBy);
                                // check student is registered or not
                                const resultSearch = registedEmailByTeachers.filter(elem => elem === dtStudent.registedBy);

                                if (resultSearch.length === 0) {
                                    studentInfo.dataValues.registedBy = dtStudent.registedBy;
                                    const dataStudnet = {
                                        email: studentInfo.dataValues.email,
                                        isSubspend: false,
                                        registedBy: studentInfo.dataValues.registedBy
                                    };
                                    await Student.create(dataStudnet).then(data => {
                                        const response = {
                                            'isRegisted': true,
                                            'student': dtStudent.email,
                                            data
                                        }
                                        resolve(data);
                                    }).catch(err => {
                                        reject({
                                            'isRegisted': false,
                                            'message': err.message
                                        })
                                    })
                                } else {
                                    const message = 'teacher\'s email alredy registered: '+studentInfo.dataValues.registedBy;
                                    resolve({
                                        'isRegisted': false,
                                        'student': dtStudent.email,
                                        message
                                    });
                                }
                            })
                            

                        } catch (error) {
                            console.log('Error', error);
                        }
                    }
                })
            } else {
                resolve({
                    'isRegisted': true,
                    'student': dtStudent.email,
                    created
                });
            }
        }).catch(err => {reject({
            'isRegisted': false,
            'message': err.message
        })})
    })
}

module.exports = {
    createStudent, suspendStudent
}