const bcrypt = require('bcrypt');
const config = require('../config');

exports.generateHash = async (password) => {
    try {
        return await bcrypt.hash(password, config.SECRETS.SALT_ROUNDS);
    } catch (ex) {
        return false;
    }
};

exports.comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (ex) {
        return false;
    }
};
