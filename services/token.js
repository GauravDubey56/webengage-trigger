const jwt = require('jsonwebtoken')
const moment = require('moment');
const db = require('../db/db')

const generateToken = (userId, expires, type, secret = '1234567890') => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
};
const saveToken = async (token, userId, expiresAt, type, blacklisted = false) => {
    const [tokenId] = await db('tokens').insert({
        token,user_id : userId, expiresAt, type, blacklisted,
    });
    // token-string, userid foreign int, expires-date, type-enum, blacklisted-boolean
};
const generateAuthTokens = async (user) => {
    const authTokenExpires = moment().add(1, 'days');
    const authToken = generateToken(user.id, moment().add(1, 'days'), 'auth');
    await saveToken(authToken, user.id, authTokenExpires, 'auth');
  
    return {
      access: {
        token: authToken,
        expires: accessTokenExpires.toDate(),
      }
    };
};
module.exports = {
    generateToken
}