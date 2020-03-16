const NodeRSA=require('node-rsa');
const uuidv4=require("uuid/v4");
const schedule = require('node-schedule');
//client id and api key generation
exports.clientId=()=>{
    const keyData=Math.floor(Math.random() * 100000000);
    const key=new NodeRSA({b:512});
    const client_secret=key.encrypt(keyData,'base64');
    return client_secret;
}
exports.clientKey=()=>
{
    let client_id=uuidv4();
    return client_id;
}
//node schedule function
exports.pendingApiCheck=()=>{
    schedule.scheduleJob('* * * * *', function(startingtime){
        let date=new Date();
        console.log(date)
        let diff=(date.getTime()-startingtime.getTime())/1000;
        let hour=Math.abs(Math.round(diff/60));
        console.log("date"+date);
        console.log("starting time"+startingtime);
        if(hour==24)
        {
            return 2;
    
        }
      });
} 