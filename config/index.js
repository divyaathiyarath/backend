const dbConstants = require('./dbConstants.json');

module.exports = {
  DB_CONSTANTS: dbConstants,
  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
  },
  DATABASE: {
    userCollectionName: 'users'
  },
  JWT: {
    PAYLOAD: {
      name: 'forfit'
    },
    SECRET_KEY: 'secretKey'
  },
  PAGINATION_LIMIT: 10,
  REDIS: {
    HOST: 'localhost',
    PORT: 6379,
    TOKEN_EXP: 86400000,
    OTP_EXP: 86400000
  },
  SECRETS: {
    SALT_ROUNDS: 10
  }
};
