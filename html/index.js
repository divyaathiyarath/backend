const welcome = require('./welcome');
const resetPassword = require('./reset-password');
const confirmEmail = require('./confirm-email')

module.exports =
    {
        welcome: welcome,
        confirmEmail: confirmEmail,
        resetPassword: resetPassword
    };
