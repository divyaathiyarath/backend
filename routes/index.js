const express = require('express');
const router = express.Router();

const merchants = require('./merchants');
const apiKey=require('./apiKey');
router.use('/merchants', merchants);
router.use('/apiKey',apiKey);
module.exports = router;
