const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/fields/validator');
const verifyRequest = require('../middlewares/fields/verifyrequest');
const authCheck = require('../middlewares/authentication/authCheckController');
const apiKeyAccess=require('../middlewares/authentication/apiKeyAcessController');
const {
    signUp,
    login,
    forgotPassword,
    resetPassword,
    editProfile,
    apiKeyGeneration
} = require('../modules/merchant/merchantController');

router.post('/signUp', validate('merchant-registration'), verifyRequest, signUp);
router.post('/login', validate('merchant-login'), login);
router.post('/forgotPassword', authCheck, validate('merchant-forgot-password'), verifyRequest,forgotPassword);
router.post('/resetPassword', validate('merchant-reset-password'), verifyRequest, resetPassword);
router.post('/editProfile',authCheck,validate('merchant-edit'),verifyRequest,editProfile);
router.post('/api-key-generation',authCheck,apiKeyAccess,verifyRequest,apiKeyGeneration);
module.exports = router;
