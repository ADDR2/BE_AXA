const EventEmitter = require('events');
const { initializeApp } = require('firebase');

class InitController extends EventEmitter {
    constructor() {
        super();

        process.nextTick(() => {
            this.connectToDB() && this.emit('start');
        });
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
            }).database();
            console.log('Connected to Firebase :)'.green);
            return true;
        } catch(error) {
            this.emit('end');
            return false;
        }
    }
}

module.exports = new InitController();