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

const updateMerchant = async (searchQuery, updateQuery) => {

    let data = await db.Merchant.findOneAndUpdate(searchQuery, updateQuery);
    return data;
};
const searchApiKeyData=async(params)=>{
    console.log(params);
    let result=await db.api_key.findById(params);
    return result;
}
const addClient=async(params)=>{
    let clientDetails=await db.api_keys.insertMany(params);
    return clientDetails;
};
const updateClient=async (searchQuery,updateQuery)=>{
    let Data=await db.api_key.updateMany(searchQuery,updateQuery);
    return Data;
};
module.exports = {
    searchMerchant,
    addMerchant,
    updateMerchant,
    addClient,
    updateClient,
    searchApiKeyData
};
