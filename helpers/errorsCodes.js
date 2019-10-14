module.exports = {
    FIREBASE_CONNCTION_ERROR: {
        message: 'Something went wrong trying to connect to DB :/',
        code: 1,
        httpCode: 500
    },
    FIREBASE_OPERATION_ERROR: {
        message: 'Firebase error',
        code: 2,
        httpCode: 500
    },
    AUTHENTICATION_FAILURE: {
        message: 'Cannot authenticate user :/',
        code: 3,
        httpCode: 401
    },
    AUTHORIZATION_FAILURE: {
        message: 'Unauthorized action :/',
        code: 4,
        httpCode: 403
    }
};