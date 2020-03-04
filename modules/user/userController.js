const response = require('../../utilities/response');
const { adduser } = require('./userServices');


const signUp = async (req, res, next) => {
    try {
        let userData = await adduser(req.body);
        return response.success(res,null,'signup completed')

    }
    catch (error) {
        next(error);
    }
}

module.exports ={
    signUp
}