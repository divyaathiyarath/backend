const db = require('../../models');

const searchMerchant = async (params) => {
    let data = await db.Merchant.findOne({ email: params }, 'id email password type');
    return data;
};
const addMerchant = async (params) => {
    let details = {
        email: params.email,
        password: params.password,
        type: params.type
    };
    let data = await db.Merchant.insertMany(details);
    return data;
};

module.exports = {
    searchMerchant,
    addMerchant
};
