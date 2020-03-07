const bluebird = require('bluebird');
const redis = require('redis');
const jwt = require('jsonwebtoken');

bluebird.promisifyAll(redis.RedisClient.prototype);

const config = require('../config');

const client = redis.createClient({
    host: config.REDIS.HOST,
    port: config.REDIS.PORT
});

exports.loginSession = async (userData, stayLoggedIn) => {
    const token = jwt.sign(config.JWT.PAYLOAD, config.JWT.SECRET_KEY);
    try {
        const expiry = stayLoggedIn ? 8.64e11 : config.REDIS.TOKEN_EXP;
        await client.setAsync(token, JSON.stringify(userData), 'EX', expiry);
        return token;
    } catch (ex) {
        // loggerUtil.error({
        //     message: ex.toString(),
        //     level: 'error'
        // });
        return false;
    }
};

exports.checkSession = async (token) => {
    try {
        var userData = await client.getAsync(token);
        return JSON.parse(userData);
    } catch (ex) {
        // loggerUtil.error({
        //     message: ex.toString(),
        //     level: 'error'
        // });
        return false;
    }
};

exports.logoutSession = async (token) => {
    try {
        await client.delAsync(token);
        return true;
    } catch (ex) {
        // loggerUtil.error({
        //     message: ex.toString(),
        //     level: 'error'
        // });
        return false;
    }
};

exports.otpCreateSession = async (email, otp) => {
    try {
        await client.setAsync(email, otp, 'EX', config.REDIS.OTP_EXP);
        return true;
    } catch (ex) {
        // loggerUtil.error({
        //     message: ex.toString(),
        //     level: 'error'
        // });
        return false;
    }
};

exports.otpCheckSession = async (email, otp) => {
    try {
        var redisOtp = await client.getAsync(email);
        return (redisOtp === otp);
    } catch (ex) {
        // loggerUtil.error({
        //     message: ex.toString(),
        //     level: 'error'
        // });
        return false;
    }
};

exports.otpDeleteSession = async (email) => {
    try {
        await client.delAsync(email);
        return true;
    } catch (ex) {
        // loggerUtil.error({
        //     message: ex.toString(),
        //     level: 'error'
        // });
        return false;
    }
};
