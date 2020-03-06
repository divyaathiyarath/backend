const {
    check
} = require('express-validator');

const validate = method => {
    switch (method) {
        case 'merchant-registration': {
            return [
                check('email', "email_id doesn't exists").exists().bail()
                    .isEmail().bail().withMessage('Invalid email address'),
                check('password', 'Password cannot be left blank').exists().trim().bail()
                    .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long').bail()
                    .isLength({ max: 16 }).withMessage('Password entered exceeds the maximum length').bail()
                    .matches(`^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9\s\+-=;:,.'"!@#$%^*|&?]{8,16}$`, 'i')
                    .withMessage('Please enter a valid password'),
                check('type', "Merchant type doesn't exists").exists().bail()
                    .isInt().bail().withMessage('Invalid merchant type')
            ];
        }
        case 'merchant-login': {
            return [
                check('email', "email_id doesn't exists").exists().bail()
                    .isEmail().bail().withMessage('Invalid email address'),
                check('password', 'Password cannot be left blank').exists().trim().bail()
                    .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long').bail()
                    .isLength({ max: 16 }).withMessage('Password entered exceeds the maximum length').bail()
                    .matches(`^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9\s\+-=;:,.'"!@#$%^*|&?]{8,16}$`, 'i')
                    .withMessage('Please enter a valid password')
            ];
        }
    }
};

module.exports = {
    validate
};
