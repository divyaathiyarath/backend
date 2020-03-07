const response = require('../../utilities/response');
const { sendMail } = require('../../utilities/email');
const { loginSession, otpCreateSession } = require('../../utilities/redis');
const messages = require('../../utilities/messages.json');
const {
    validationResult
} = require('express-validator');
const {
    generateHash,
    comparePassword
} = require('../../utilities/password');
const config = require('../../config');
const {
    searchMerchant,
    addMerchant
} = require('./merchantServices');

const signUp = async (req, res, next) => {
    try {
        let merchantTypes = Object.values(config.DB_CONSTANTS.MERCHANT_TYPE);
        if (!merchantTypes.includes(req.body.type)) {
            return response.error(res, null, config.HTTP_STATUS_CODES.BAD_REQUEST, messages.invalid_merchant_type);
        }
        let searchMerchantData = await searchMerchant(req.body.email);
        if (searchMerchantData) {
            return response.error(res, null, config.HTTP_STATUS_CODES.CONFLICT, messages.already_exits);
        }
        let generateHashResult = await generateHash(req.body.password);
        if (!generateHashResult) {
            return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
        } else {
            req.body.password = generateHashResult;
            let merchantData = await addMerchant(req.body);
            if (!merchantData) {
                return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
            }
            return response.success(res, null, messages.signup_success);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response.error(res, null, config.HTTP_STATUS_CODES.BAD_REQUEST, messages.invalid_user_name_or_password);
        }
        let searchMerchantData = await searchMerchant(req.body.email);
        if (!searchMerchantData) {
            return response.error(res, null, config.HTTP_STATUS_CODES.BAD_REQUEST, messages.invalid_user_name_or_password);
        }
        let comparedPasswordResult = await comparePassword(req.body.password, searchMerchantData.password);
        if (!comparedPasswordResult) {
            return response.error(res, null, config.HTTP_STATUS_CODES.BAD_REQUEST, messages.invalid_user_name_or_password);
        }
        let token = await loginSession(searchMerchantData, req.body.stayLoggedIn);
        if (!token) {
            return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
        }
        return response.success(res, {
            token: token,
            id: searchMerchantData.id,
            type: searchMerchantData.type
        }, messages.login_success);
    } catch (e) {

    }
};

const forgotPassword = async (req, res, next) => {
    try {
        let username = req.body.email;

        let userData = await searchMerchant(username);

        if (!userData) {
            return response.success(res, null, messages.sent_otp);
        }

        let otp = Math.floor(1e5 + Math.random() * 9e5);
        let subject = 'Reset Password - Forfit';
        let html = `<p>Your otp is ${otp}</p>`;

        await otpCreateSession(userData.email, otp);

        let mailData = await sendMail(userData.email, subject, null, html);

        if (!mailData) {
            return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
        } else {
            return response.success(res, null, messages.sent_otp);
        }
    } catch (ex) {
        return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
    }
};

module.exports = {
    signUp,
    login,
    forgotPassword
};
