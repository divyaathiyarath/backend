const express = require('express');
const router = express.Router();

const merchants = require('./merchants');

router.use('/merchants', merchants);

module.exports = router;
