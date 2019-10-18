/* 3rd party libraries */
const EventEmitter = require('events');
const { initializeApp } = require('firebase');

class InitController extends EventEmitter {
    constructor() {
        super();

        this.signUpEmail = process.env.SEED_EMAIL;
        this.signUpPassword = process.env.SEED_PWD;

        process.nextTick(() => {
            this.connectToDB() && this.signInUser();
        });
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
                apiKey: process.env.FIREBASE_API_KEY,
                authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                databaseURL: process.env.FIREBASE_DATABASE_URL,
                projectId: process.env.FIREBASE_PROJECT_ID,
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
                appId: process.env.FIREBASE_APP_ID
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