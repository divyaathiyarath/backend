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
//Merchant data updation
const updateMerchant = async (searchQuery, updateQuery) => {
    let data = await db.Merchant.findOneAndUpdate(searchQuery, updateQuery);
    return data;
};
//Merchant data collection
const readMerchant=async(searchQuery)=>{
    let merchantData=await db.Merchant.findById({_id:searchQuery});
    return merchantData;
};
module.exports = {
    searchMerchant,
    addMerchant,
    updateMerchant,
    readMerchant
};
