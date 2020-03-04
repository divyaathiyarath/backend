const db = require('../../models');

const adduser = async (params) => {
    let data = await db.User.insertMany(params);
    return data;
};

module.exports = {
    adduser
}