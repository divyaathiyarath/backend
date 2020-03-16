const response = require('../../utilities/response');
const messages = require('../../utilities/messages.json');
const apiKey=require('../../utilities/apiKey');
const {pendingApiCheck}=require('../../utilities/apiKey');


const config = require('../../config');

const {searchApiKeyData,
       addClient,
       updateClient}=require('./apiKeyServices');
 //Api to perform key generation   
const  apiKeyGeneration=async(req,res,next)=>{
try{     
   
    let merchant_id=req.userData._id;
    let searchQuery={merchant_id:merchant_id};
    let merchant_type=req.userData.type;
    let client_id=apiKey.clientId();
    let client_secret=apiKey.clientKey();
    let apiKeyData=await searchApiKeyData(searchQuery);
    if(!apiKeyData)
    {  
  
    let clientData=await addClient(merchant_id,client_id,client_secret,merchant_type);
    if (!clientData) {
      return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
     }
     else{
     return response.success(res, null, messages.apiKey_success);
         }
    }
    else
    {
    //Disable api key status
     searchQuery={merchant_id:req.userData._id}
     updateQuery={client_secret_status:"2"}
     let updateStatus=await (updateClient(searchQuery,updateQuery));
     if (!updateStatus) {
      return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
     }
     let clientData=await addClient(merchant_id,client_id,client_secret,merchant_type);
     if (!clientData) {
       return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
      }
     return response.success(res, null, messages.apiKey_success);
    }
  }
  catch(error)
  {
    console.log(error);
  }
}  
//Api to deactivate an existing api_key within 24 hour
const apiKeyPending=async(req,res,next)=>{
try{
  let merchant_id=req.userData._id;
  let searchQuery={merchant_id:merchant_id};
  let merchant_type=req.userData.type;
  let client_id=apiKey.clientId();
  let client_secret=apiKey.clientKey();
  let apiKeyData=await searchApiKeyData(searchQuery);
  if(!apiKeyData)
  {  

  let clientData=await addClient(merchant_id,client_id,client_secret,merchant_type);
  if (!clientData) {
    return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
   }
   else{
   return response.success(res, null, messages.apiKey_success);
       }
   }
   else{
     //Updating the api status to pending
     let searchQuery={merchant_id:merchant_id};
     updateQuery={client_secret_status:3};
     let updateStatus=await (updateClient(searchQuery,updateQuery));
     if (!updateStatus) {
      return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
     }
    // collecting the updated time
      searchQuery={
      merchant_id:merchant_id,
      client_secret_status:3
     };
     let apiKeyData=await searchApiKeyData(searchQuery);
     if(apiKeyData)
      {
        
        let createdTime=apiKeyData.updated_at;
        //Node schedule function call
        let status=await pendingApiCheck(createdTime);
       if(status==2)
       {
        updateQuery={client_secret_status:2}
        let updateStatus=await (updateClient(searchQuery,updateQuery));
        if (!updateStatus) {
         return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
       }
      }
    }
       let clientData=await addClient(merchant_id,client_id,client_secret,merchant_type);
      if (!clientData) {
      return response.error(res, null, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, messages.internal_server_error);
       }
      else{
       return response.success(res, null, messages.apiKey_success);
       }
    
   }
   } 
 catch(error)        
 {
  console.log(error);
 }
}

module.exports={
  apiKeyGeneration,
  apiKeyPending
};