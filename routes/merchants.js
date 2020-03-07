const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/fields/validator');
const verifyRequest = require('../middlewares/fields/verifyrequest');
const {
    signUp,
    login,
    forgotPassword
} = require('../modules/merchant/merchantController');

router.post('/signUp', validate('merchant-registration'), verifyRequest, signUp);
router.post('/login', validate('merchant-login'), login);
router.post('/forgotPassword',validate('merchant-forgot-password'), verifyRequest, forgotPassword);
module.exports = router;
