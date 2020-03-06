const response = require('../../utilities/response');
const { loginSession } = require('../../utilities/redis');
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
            let merchantData = await addMerchant({
                email: req.body.email,
                password: generateHashResult,
                type: req.body.type

            });
            if (!merchantData) {
                return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
            }
            return response.success(res, null, 'signup completed');
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

module.exports = {
    signUp,
    login
};
