const Util = require('./emailHelper');

test('success - check email:', () => {
    const email = 'thangldse03529@gmail.com';
    expect(Util.checkEmail(email)).toBe(true);
})

test('failed - check email:', () => {
    const email = 'thangldse0352mail.gg';
    expect(Util.checkEmail(email)).toBe(false);
})

test('success - splitemail:', () => {
    const email = 'thangldse03529@gmail.com,thangldse035292@gmail.com';
    const expectedResult = ['thangldse03529@gmail.com', 'thangldse035292@gmail.com'];
    expect(Util.splitemail(email)).toStrictEqual(expectedResult);
})

test('success - getDuplicateEmail get duplicated email address', () => {
    const emails = ['thangldse03529@gmail.com', 'thangldse035292@gmail.com', 'thangldse035292@gmail.com'];
    const expectedResult = ['thangldse035292@gmail.com'];
    expect(Util.getDuplicateEmail(emails)).toStrictEqual(expectedResult);
})

test('failed - getDuplicateEmail get duplicated email address', () => {
    const emails = ['thangldse03529@gmail.com', 'thangldse035292@gmail.com'];
    const expectedResult = [];
    expect(Util.getDuplicateEmail(emails)).toStrictEqual(expectedResult);
})

test('success - getListEmailFromNotification', () => {
    const notification = 'Hello students! @studentA@gmail.com @studentD@gmail.com @studentE@gmail.com @123akaka@';
    const expectedResult = ['studentA@gmail.com', 'studentD@gmail.com', 'studentE@gmail.com']
    expect(Util.getListEmailFromNotification(notification)).toStrictEqual(expectedResult);
})

test('success - getUniqEmailWithRegistered', () => {
    const emails = [
        {
            email: 'abcxyz@aa.cc',
            registedBy: '1234@aa.bb'
        },
        {
            email: 'abcxyz@aa.cc',
            registedBy: '1234@cc.dd'
        },
        {
            email: 'abcxyz123@aa.cc',
            registedBy: '1234@aa.bb'
        }
    ]
    const expectedResult = [
        {
            email: 'abcxyz@aa.cc',
            registedBy: '1234@cc.dd and 1234@aa.bb'
        }
    ]

    expect(Util.getUniqEmailWithRegistered(emails)).toStrictEqual(expectedResult);
})