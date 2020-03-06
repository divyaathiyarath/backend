const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/fields/validator');
const verifyRequest = require('../middlewares/fields/verifyrequest');
const {
    signUp,
    login
} = require('../modules/merchant/merchantController');

router.post('/signUp', validate('merchant-registration'), verifyRequest, signUp);
router.post('/login', validate('merchant-login'), login);
module.exports = router;
