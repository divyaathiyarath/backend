const { validationResult } = require('express-validator');

function verifyRequest (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const data = {
            status: false,
            message: 'Input validation failed',
            errors: errors.array()
        };
        console.log(data);
        res.status(422);
        res.json(data);
        return;
    }
    next();
}
module.exports = verifyRequest;
