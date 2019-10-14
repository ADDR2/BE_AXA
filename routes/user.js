/* 3rd party libraries */
const router = require("express").Router();
const passport = require('passport');

/* Local libraries */
const HttpError = require('../helpers/httpError');
const {
    INVALID_REQUEST_DATA,
    AUTHENTICATION_FAILURE,
    LOGOUT_ERROR
} = require('../helpers/errorsCodes');
const UserController = require('../controllers/userController');

/*
    @param req: request object
    @param res: response object
    function signUp: service that registers a user and returns a token
*/
const signUp = (req, res) => {
    try {
        const { username, password } = req.body;

        if(typeof username !== 'string' || !username) throw new HttpError({
            ...INVALID_REQUEST_DATA,
            message: INVALID_REQUEST_DATA.message + 'username'
        });
        if(typeof password !== 'string' || !password) throw new HttpError({
            ...INVALID_REQUEST_DATA,
            message: INVALID_REQUEST_DATA.message + 'password'
        });

        UserController.signUp(username, password)
            .then(token => {
                res.status(201).send({ token });
            })
            .catch(error => {
                res.status(error.httpCode).send(error.message);
            })
        ;
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.httpCode).send(error.message);
        } else {
            res.status(INVALID_REQUEST_DATA.httpCode).send(INVALID_REQUEST_DATA.message);
        }
        process.env.NODE_ENV !== 'test' && console.error(error.message.red);
    }
};

/*
    @param req: request object
    @param res: response object
    function logout: service that logs out the user
*/
const logout = (req, res) => {
    try {
        const { user } = req;
        if(!user) throw new HttpError(AUTHENTICATION_FAILURE);

        UserController.logout(user.id)
            .then(() => {
                res.status(200).send('Logged out :)');
            })
            .catch(error => {
                res.status(error.httpCode).send(error.message);
            })
        ;
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.httpCode).send(error.message);
        } else {
            res.status(LOGOUT_ERROR.httpCode).send(LOGOUT_ERROR.message);
        }
        process.env.NODE_ENV !== 'test' && console.error(error.message.red);
    }
};

/*
    @param req: request object
    @param res: response object
    function login: service that authenticates a user
*/
const login = (req, res) => {
    try {
        const { username, password } = req.body;

        if(typeof username !== 'string' || !username) throw new HttpError({
            ...INVALID_REQUEST_DATA,
            message: INVALID_REQUEST_DATA.message + 'username'
        });
        if(typeof password !== 'string' || !password) throw new HttpError({
            ...INVALID_REQUEST_DATA,
            message: INVALID_REQUEST_DATA.message + 'password'
        });

        UserController.login(username, password)
            .then(token => {
                res.status(200).send({ token });
            })
            .catch(error => {
                res.status(error.httpCode).send(error.message);
            })
        ;
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.httpCode).send(error.message);
        } else {
            res.status(INVALID_REQUEST_DATA.httpCode).send(INVALID_REQUEST_DATA.message);
        }
        process.env.NODE_ENV !== 'test' && console.error(error.message.red);
    }
};

/*
Route of login service
Example of use:
    method: POST
    url: "http://localhost:3000/users/login"
    body: {
        username: 'username',
        password: 'password'
    }
*/
router.post("/login", login);

/*
Route of signUp service
Example of use:
    method: POST
    url: "http://localhost:3000/users/signup"
    body: {
        username: 'username',
        password: 'password'
    }
*/
router.post("/signup", signUp);

/*
Route of logout service
Example of use:
    method: POST
    url: "http://localhost:3000/users/"
*/
router.post("/logout", passport.authenticate('jwt', { session: false }), logout);

if(process.env.NODE_ENV === 'test')
    module.exports = {
        login,
        logout,
        signUp
    };
else module.exports = router;