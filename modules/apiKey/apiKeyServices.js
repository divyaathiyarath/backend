const db = require('../../models');

const searchApiKeyData=async(searchQuery)=>{
    let result=await db.api_key.findOne(searchQuery);
    //console.log("search api"+result);
    return result;
}
const addClient=async(merchant_id,client_id,client_secret,merchant_type)=>{
   
    const details={
        merchant_id:merchant_id,
        client_id:client_id,
        client_secret:client_secret,
        merchant_type:merchant_type
    };
    let clientDetails=await db.api_key.insertMany(details);
    return clientDetails;
};
const updateClient=async (searchQuery,updateQuery)=>{
    let Data=await db.api_key.updateMany(searchQuery,updateQuery);
    // console.log(Data);
    return Data;
};

// const readClient=async(searchQuery)=>{

//     let details=await db.api_key.
// }

module.exports = {
    searchApiKeyData,
    addClient,
    updateClient
};