/* 3rd party libraries */
const router = require("express").Router();
const passport = require('passport');

/* Local libraries */
const userController = require('../controllers/userController');

/*
    @param req: request object
    @param res: response object
    function signUp: service that registers a user and returns a token
*/
const signUp = (req, res) => {
    try {
        const { username, password } = req.body;

        if(typeof username !== 'string' || !username) throw new Error('Invalid username');
        if(typeof password !== 'string' || !password) throw new Error('Invalid password');

        userController.signUp(username, password)
            .then(token => {
                res.status(201).send({ token });
            })
            .catch(error => {
                console.error(error.message.red);
                res.status(500).send(error.message);
            })
        ;
    } catch (error) {
        res.status(400).send(error.message);
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
        if(!user) throw new Error('Unable to authenticate user :/');

        userController.logout(user.id)
            .then(() => {
                res.status(200).send('Logged out :)');
            })
            .catch(error => {
                console.error(error.message.red);
                res.status(500).send(error.message);
            })
        ;
    } catch (error) {
        res.status(400).send(error.message);
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

        if(typeof username !== 'string' || !username) throw new Error('Invalid username');
        if(typeof password !== 'string' || !password) throw new Error('Invalid password');

        userController.login(username, password)
            .then(token => {
                res.status(200).send({ token });
            })
            .catch(error => {
                console.error(error.message.red);
                res.status(500).send(error.message);
            })
        ;
    } catch (error) {
        res.status(400).send(error.message);
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