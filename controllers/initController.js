/* 3rd party libraries */
const EventEmitter = require('events');
const { initializeApp } = require('firebase');

class InitController extends EventEmitter {
    constructor() {
        super();

        this.signUpEmail = process.env.SEED_EMAIL;
        this.signUpPassword = process.env.SEED_PWD;

        this.connectToDB() && this.signInUser();
    }

    async signInUser() {
        try {
            await this.AUTH.signInWithEmailAndPassword(this.signUpEmail, this.signUpPassword);
            this.emit('start');
        } catch(error) {
            this.emit('end');
        }
    }

    async signOutUser() {
        try {
            this.AUTH.currentUser && await this.AUTH.signOut();
        } catch(error) {
            console.error('Could not sign out'.red);
        }
    }

    connectToDB() {
        try {
            this.firebase = initializeApp({
                apiKey: "<YOUR_KEY>",
                authDomain: "<YOUR_KEY>",
                databaseURL: "<YOUR_KEY>",
                projectId: "<YOUR_KEY>",
                storageBucket: "<YOUR_KEY>",
                messagingSenderId: "<YOUR_KEY>",
                appId: "<YOUR_KEY>"
            });

            this.DB = this.firebase.database();
            this.AUTH = this.firebase.auth();
            console.log('Connected to Firebase :)'.green);
            return true;
        } catch(error) {
            this.emit('end');
            return false;
        }
    }
}

if (process.env.NODE_ENV === 'test') module.exports = InitController;
else module.exports = new InitController();