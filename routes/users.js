const express = require('express');
const router = express.Router();
const { signUp } = require('../modules/user/userController');

router.post('/signUp', signUp);
module.exports = router;
