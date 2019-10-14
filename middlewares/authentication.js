/* 3rd party libraries */
const { ExtractJwt, Strategy } = require('passport-jwt');

/* Local libraries */
const UserController = require('../controllers/userController');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

module.exports = new Strategy(options, function({ id }, done) {
    UserController.getUserById(id)
        .then(user => {
            user.token && done(null, { ...user, id });
            !user.token && done(null, null);
        })
        .catch(error => {
            console.error(error);
            done(null, null);
        })
    ;
});