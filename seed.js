/* 3rd party libraries */
const { get } = require('axios');
/* Local libraries */
require('./helpers/coloredStrings');
const initController = require('./controllers/initController');
const { FIREBASE_CONNCTION_ERROR, FIREBASE_OPERATION_ERROR } = require('./helpers/errorsCodes');

class Seed {
    constructor() {
        this.clientsURL = process.env.CLIENTS_URL || 'http://www.mocky.io/V2/5808862710000087232b75ac';
        this.policiesURL = process.env.POLICIES_URL || 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

        initController.on('start', async () => {
            try {
                await this.dropUsers();
                await this.dropPolicies();
                await this.dropClients();

                await this.populateClients();
                await this.populatePolicies();

                await initController.signOutUser();

                console.log('Seed successfully executed :)'.green);
                process.exit(0);
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

    convertArrayDataIntoObject(records = []) {
        const result = {};

        for (const record of records) {
            result[record.id] = record;
        }

        return result;
    }

    async populateClients() {
        console.log('Populating clients...'.cyan);
        try {
            const { data: { clients } } = await get(this.clientsURL);
            await initController.DB.ref('/clients/').set(
                this.convertArrayDataIntoObject(clients)
            );

            console.log('Clients successfully populated'.green);
        } catch(error) {
            this.handleError('populating clients', error);
        }
    }

    async populatePolicies() {
        console.log('Populating policies...'.cyan);
        try {
            const { data: { policies } } = await get(this.policiesURL);
            await initController.DB.ref('/policies/').set(
                this.convertArrayDataIntoObject(policies)
            );

            console.log('Policies successfully populated'.green);
        } catch(error) {
            this.handleError('populating policies', error);
        }
    }

    async dropClients() {
        console.log('Dropping clients...'.cyan);
        try {
            await initController.DB.ref('/clients/').remove();
            console.log('Clients successfully dropped'.green);
        } catch(error) {
            this.handleError('dropping clients', error);
        }
    }

    async dropPolicies() {
        console.log('Dropping policies...'.cyan);
        try {
            await initController.DB.ref('/policies/').remove();
            console.log('Policies successfully dropped'.green);
        } catch(error) {
            this.handleError('dropping policies', error);
        }
    }

    async dropUsers() {
        console.log('Dropping users...'.cyan);
        try {
            await initController.DB.ref('/users/').remove();
            console.log('Users successfully dropped'.green);
        } catch(error) {
            this.handleError('dropping users', error);
        }
    }
}

if (process.env.NODE_ENV === 'test') module.exports = Seed;
else module.exports = new Seed();