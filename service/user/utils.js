const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('./../../env');

const checkRegex = ( email, password ) => {
    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    let regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if ( !regExp.test(email) || !regPw.test(password)) {
        return false
    } else {
        return true
    }        
}

const hashPassword = password => {
    let hashedPassword = bcrypt.hashSync(password, 10);

    return hashedPassword;
}

const comparePassword = ( inputPassword, dbPassword ) => {
    let checkPassword = bcrypt.compareSync(inputPassword, dbPassword);

    return checkPassword;
}

const createAccessToken = userId => {
    let accessToken = jwt.sign({userId : userId}, env.secret, {
        algorithm : "HS256",
        expiresIn : "1h"});

    return accessToken
}

const verify = accessToken => {
    let verify;
    
    try {
        verify = jwt.verify(token, env.secret);
        return {
            userId : verify.userId,
        }
    } catch (err) {
        return {
            result : false,
            message : err.message
        }
    }
}

const renewaled = accessToken => {
    
}

module.exports = {
    checkRegex,
    hashPassword,
    comparePassword,
    createAccessToken,
    verify
}