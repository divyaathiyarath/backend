const db = require('../../models');

const searchMerchant = async (params) => {
    let data = await db.Merchant.findOne({ email: params }, 'id email password type');
    return data;
};
const addMerchant = async (params) => {
    let data = await db.Merchant.insertMany(params);
    return data;
};

module.exports = {
    searchMerchant,
    addMerchant
}