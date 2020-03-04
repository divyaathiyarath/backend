// mongodb connection
const mongoose = require('mongoose');
const config = require('../config');
const response = require('../utilities/response');

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
      console.log(err)
      // return response.error(res, err, config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'error');
    }
    console.log(`Mongoose connected on ${process.env.MONGODB_URI}`)
    // return response.success(res, null, `Mongoose connected on ${process.env.MONGODB_URI}`);
  });

module.exports = {
  User: require('./users')
};
