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
    },
    USER_NOT_FOUND: {
        message: 'User is not signed up',
        code: 5,
        httpCode: 404
    },
    CLIENT_NOT_FOUND: {
        message: 'Could not find client :/',
        code: 6,
        httpCode: 404
    },
    POLICIES_NOT_FOUND: {
        message: 'Could not find any policies :/',
        code: 7,
        httpCode: 404
    },
    INVALID_PASSWORD: {
        message: 'Invalid password',
        code: 8,
        httpCode: 401
    },
    ERROR_AUTHENTICATING: {
        message: 'Unable to authenticate user :/',
        code: 9,
        httpCode: 500
    },
    LOGOUT_ERROR: {
        message: 'Unable to logout user :/',
        code: 10,
        httpCode: 500
    },
    SIGNED_UP: {
        message: 'User already signed up',
        code: 11,
        httpCode: 403
    },
    ERROR_SIGNING_UP: {
        message: 'Unable to signup user :/',
        code: 12,
        httpCode: 500
    },
    NOT_A_CLIENT: {
        message: 'User is not a client',
        code: 13,
        httpCode: 403
    },
    INVALID_REQUEST_BODY: {
        message: 'Invalid data: ',
        code: 14,
        httpCode: 400
    }
};