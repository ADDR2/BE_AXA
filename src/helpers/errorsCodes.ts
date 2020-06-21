export const FIREBASE_CONNCTION_ERROR = {
    message: 'Something went wrong trying to connect to DB :/',
    code: 1,
    httpCode: 500
};

export const FIREBASE_OPERATION_ERROR = {
    message: 'Firebase error',
    code: 2,
    httpCode: 500
};

export const AUTHENTICATION_FAILURE = {
    message: 'Cannot authenticate user :/',
    code: 3,
    httpCode: 401
};

export const AUTHORIZATION_FAILURE = {
    message: 'Unauthorized action :/',
    code: 4,
    httpCode: 403
};

export const USER_NOT_FOUND = {
    message: 'User is not signed up',
    code: 5,
    httpCode: 404
};

export const CLIENT_NOT_FOUND = {
    message: 'Could not find client :/',
    code: 6,
    httpCode: 404
};

export const POLICIES_NOT_FOUND = {
    message: 'Could not find any policies :/',
    code: 7,
    httpCode: 404
};

export const INVALID_PASSWORD = {
    message: 'Invalid password',
    code: 8,
    httpCode: 401
};

export const ERROR_AUTHENTICATING = {
    message: 'Unable to authenticate user :/',
    code: 9,
    httpCode: 500
};

export const LOGOUT_ERROR = {
    message: 'Unable to logout user :/',
    code: 10,
    httpCode: 500
};

export const SIGNED_UP = {
    message: 'User already signed up',
    code: 11,
    httpCode: 403
};

export const ERROR_SIGNING_UP = {
    message: 'Unable to signup user :/',
    code: 12,
    httpCode: 500
};

export const NOT_A_CLIENT = {
    message: 'User is not a client',
    code: 13,
    httpCode: 403
};

export const INVALID_REQUEST_DATA = {
    message: 'Invalid data: ',
    code: 14,
    httpCode: 400
};