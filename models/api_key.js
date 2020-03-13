const mongoose=require('mongoose');
const config=require('../config');
const api_key_schema=mongoose.Schema({
    merchant_id:
    {
        type:String
    },
    client_id:
    {
        type:String
    },
    client_secret:
    {
        type:String
    },
    merchant_type:
    {
        type:Number,
        required:true
    },
   client_secret_status:
    {
        type:Boolean,
        default:true
    }
},{ timestamps:
    {
     createdAt:'created_at',
     updatedAt:'updated_at'
    }
});
module.exports=mongoose.model(config.DATABASE.api_keyCollectionName,api_key_schema);