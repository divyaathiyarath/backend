const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/fields/validator');
const verifyRequest = require('../middlewares/fields/verifyrequest');
const authCheck = require('../middlewares/authentication/authCheckController');
const apiKeyAccess=require('../middlewares/authentication/apiKeyAcessController');
const {
    apiKeyGeneration,
    apiKeyPending
} = require('../modules/apiKey/apiKeyController');
router.post('/api-key-generation',authCheck,apiKeyAccess,verifyRequest,apiKeyGeneration);
router.post('/apiKeyPending',authCheck,apiKeyAccess,verifyRequest,apiKeyPending);
module.exports = router;
