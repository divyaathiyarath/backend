const config = require('../../config');
const messages = require('../../utilities/messages.json');
const redis = require('../../utilities/redis');
const response = require('../../utilities/response');

module.exports = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return response.error(res, null,
                config.HTTP_STATUS_CODES.UNAUTHORIZED,
                messages.unauthorized_user);
        }

        let userSession = await redis.checkSession(token);
        if (!userSession) {
            return response.error(res, null,
                config.HTTP_STATUS_CODES.UNAUTHORIZED,
                messages.unauthorized_user);
        }

       let userData;
       req.userData=userSession;
       console.log(req.userData);
       //res.send(req.userData);

        
        next();
    } catch (ex) {
        return response.error(res, null,
            config.HTTP_STATUS_CODES.UNAUTHORIZED,
            messages.unauthorized_user);
    }
};
