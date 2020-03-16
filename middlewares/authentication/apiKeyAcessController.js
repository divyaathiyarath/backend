const config = require('../../config');
const messages = require('../../utilities/messages.json');
const redis = require('../../utilities/redis');
const response = require('../../utilities/response');

module.exports = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        let userSession = await redis.checkSession(token);
     
      if(userSession.type!==config.API_KEY_ACCESS_TYPE)
      {
          return response.error(res,null,config.HTTP_STATUS_CODES.UNAUTHORIZED,messages.unauthorized_user);
      }
      

        
        next();
    } catch (ex) {
        return response.error(res, null,
            config.HTTP_STATUS_CODES.UNAUTHORIZED,
            messages.unauthorized_user);
    }
};
