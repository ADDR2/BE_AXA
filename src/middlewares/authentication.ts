/* 3rd party libraries */
import { ExtractJwt, Strategy } from 'passport-jwt';

/* Local libraries */
import UserController from '../controllers/userController';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

export default new Strategy(options, function({ id }, done) {
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