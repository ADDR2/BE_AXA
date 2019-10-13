/* 3rd party libraries */
const { get } = require('axios');
/* Local libraries */
require('./helpers/coloredStrings');
const initController = require('./controllers/initController');
const { FIREBASE_CONNCTION_ERROR, FIREBASE_OPERATION_ERROR } = require('./helpers/errorsCodes');

class Seed {
    constructor() {
        initController.on('start', async () => {
            try {
                await this.dropUsers();
                await this.dropPolicies();
                await this.dropClients();

                await this.populateClients();
                await this.populatePolicies();
            } catch(error) {
                this.handleError('executing seed', error);
            }
        });

        initController.on(
            'end',
            () => console.error(FIREBASE_CONNCTION_ERROR.message.red)
        );
    }

    handleError(specificMessage = '', error = new Error()) {
        console.error(
            `${FIREBASE_OPERATION_ERROR.message} ${specificMessage}`.red,
            error
        );

        process.exit(1);
    }

    async populateClients() {
        console.log('Populating clients...'.cyan);
        try {

        } catch(error) {
            this.handleError('populating cilents', error);
        }
    }

    async populatePolicies() {
        console.log('Populating policies...'.cyan);
        try {

        } catch(error) {
            this.handleError('populating policies', error);
        }
    }

    async dropClients() {
        console.log('Dropping clients...'.cyan);
        try {

        } catch(error) {
            this.handleError('dropping cilents', error);
        }
    }

    async dropPolicies() {
        console.log('Dropping policies...'.cyan);
        try {

        } catch(error) {
            this.handleError('dropping policies', error);
        }
    }

    async dropUsers() {
        console.log('Dropping users...'.cyan);
        try {

        } catch(error) {
            this.handleError('dropping users', error);
        }
    }
}

if (process.env.NODE_ENV === 'test') module.exports = Seed;
else module.exports = new Seed();