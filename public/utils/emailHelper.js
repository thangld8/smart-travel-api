/*
 * @Author: ThangLD
 * @Email: ThangLDse03529@gmail.com
 * @Account Utils - emailHelper
 */

/**
* @param  {} emailString
* check is email address or not
*/
const checkEmail = (emailString) => {
    const regexPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexPattern.test(emailString);
}

/**
* @param  {} emails
* split to multiple email
*/
const splitemail = (emails) => {
    return emails.split(',');
}

/**
* @param  {} notification
* get all email address from notification
*/
const getListEmailFromNotification = (notification) => {
    let splitEmail = notification.split('\ \@');
    splitEmail = splitEmail.filter(email => checkEmail(email));
    return splitEmail;
}

/**
* @param  {} emails
* get all duplicated email
*/
const getDuplicateEmail = (emails) => {
    const uniq = emails
    .map((email) => {
        return {
            count: 1,
            email: email
        }
    })
    .reduce((a, b) => {
        a[b.email] = (a[b.email] || 0) + b.count
        return a
    }, {})

    return Object.keys(uniq).filter((a) => uniq[a] > 1);
}

/**
* @param  {} emails
* get uniqe email with registered teacher's email
*/
const getUniqEmailWithRegistered = (emails) => {
    let result = [];
    const lsE = emails.reduce((unique, o) => {
        if(!unique.some(obj => obj.email === o.email)) {
            unique.push(o);
        }
        return unique;
    },[]);

    emails.forEach(element => {
        lsE.forEach(x => {
            if (x.email === element.email) {
                const countE = element.registedBy.split(' and ');
                if (countE.indexOf(x.registedBy) < 0) {
                    element.registedBy = element.registedBy+' and '+x.registedBy
                    result.push(element);
                }
            }
        })
    });

    return result;
    
}

module.exports = {
    checkEmail, splitemail, getListEmailFromNotification, getDuplicateEmail, getUniqEmailWithRegistered
}