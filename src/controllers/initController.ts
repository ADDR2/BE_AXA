/* 3rd party libraries */
import { EventEmitter } from 'events';
import { initializeApp } from 'firebase';

/* Local libraries */
import ColoredString from '../helpers/coloredStrings';

class InitController extends EventEmitter {
    signUpEmail = process.env.SEED_EMAIL;
    signUpPassword = process.env.SEED_PWD;
    firebase: firebase.app.App;
    DB: firebase.database.Database;
    AUTH: firebase.auth.Auth;

    constructor() {
        super();

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
            console.error(new ColoredString('Could not sign out').red());
        }
    }

    connectToDB(): boolean {
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
            console.log(new ColoredString('Connected to Firebase :)').green());
            return true;
        } catch(error) {
            this.emit('end');
            return false;
        }
    }
}

export default new InitController();