/* 3rd party libraries */
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

/* Local libraries */
const { AUTHENTICATION_FAILURE } = require('../helpers/errorsCodes');
const FirebaseDB = require('../services/firebaseDB');

class UserController {
    static async getUserById(id = '') {
        try {
            return await FirebaseDB.getUserById(id);
        } catch(error) {
            console.error(error.message.red);
            throw new Error(AUTHENTICATION_FAILURE.message);
        }
    }

    static async login(username = '', password = '') {
        try {
            const user = await FirebaseDB.getUserByUsername(username);

            if (!user) throw new Error('User not found');
            if(!await bcrypt.compare(password, user.password)) throw new Error('Password does not match');

            const token = jwt.sign(
                { id: user.id },
                process.env.SECRET,
                { expiresIn: 100000 }
            );

            await FirebaseDB.setTokenToUser(user.id, token);

            return token;
        } catch(error) {
            console.error(error.message.red);
            throw new Error('Unable to login user :/');
        }
    }

    static async signUp(username = '', password = '') {
        try {
            const user = await FirebaseDB.getUserByUsername(username).catch(() => {});

            if (user) throw new Error('User already signed up');

            const client = await FirebaseDB.getClientByUsername(username);
            await FirebaseDB.createUser(client, await bcrypt.hash(password, 10));

            return await UserController.login(username, password);
        } catch(error) {
            console.error(error.message.red);
            throw new Error('Unable to sign up user :/');
        }
    }

    static async logout(userId = '') {
        try {
            await FirebaseDB.removeTokenToUser(userId);
        } catch(error) {
            console.error(error.message.red);
            throw new Error('Unable to logout user :/');
        }
    }
}

module.exports = UserController;