/* 3rd party libraries */
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

/* Local libraries */
import HttpError from '../helpers/httpError';
import {
    AUTHENTICATION_FAILURE,
    USER_NOT_FOUND,
    INVALID_PASSWORD,
    ERROR_AUTHENTICATING,
    LOGOUT_ERROR,
    SIGNED_UP,
    ERROR_SIGNING_UP,
    NOT_A_CLIENT
} from '../helpers/errorsCodes';
import FirebaseDB from '../services/firebaseDB';
import ColoredString from '../helpers/coloredStrings';

class UserController {
    static async getUserById(id = '') {
        try {
            return await FirebaseDB.getUserById(id);
        } catch(error) {
            console.error(new ColoredString(error.message).red());
            throw new HttpError(AUTHENTICATION_FAILURE);
        }
    }

    static async login(username = '', password = '') {
        try {
            const user = await FirebaseDB.getUserByUsername(username).catch(() => {});

            if (!user) throw new HttpError(USER_NOT_FOUND);
            if(!await bcrypt.compare(password, user.password)) throw new HttpError(INVALID_PASSWORD);

            const token = jwt.sign(
                { id: user.id },
                process.env.SECRET,
                { expiresIn: 100000 }
            );

            await FirebaseDB.setTokenToUser(user.id, token);

            return token;
        } catch(error) {
            console.error(new ColoredString(error.message).red());
            if (error instanceof HttpError) {
                throw error;
            } else {
                throw new HttpError(ERROR_AUTHENTICATING);
            }
        }
    }

    static async signUp(username = '', password = '') {
        try {
            const user = await FirebaseDB.getUserByUsername(username).catch(() => {});
            if (user) throw new HttpError(SIGNED_UP);

            const client = await FirebaseDB.getClientByUsername(username).catch(() => {});
            if (!client) throw new HttpError(NOT_A_CLIENT);

            await FirebaseDB.createUser(client, await bcrypt.hash(password, 10));

            return await UserController.login(username, password);
        } catch(error) {
            console.error(new ColoredString(error.message).red());
            if (error instanceof HttpError) {
                throw error;
            } else {
                throw new HttpError(ERROR_SIGNING_UP);
            }
        }
    }

    static async logout(userId = '') {
        try {
            await FirebaseDB.removeTokenToUser(userId);
        } catch(error) {
            console.error(new ColoredString(error.message).red());
            throw new HttpError(LOGOUT_ERROR);
        }
    }
}

export default UserController;