/* 3rd party libraries */
require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` });
import axios from 'axios';
/* Local libraries */
import ColoredString from './helpers/coloredStrings';
import InitController from './controllers/initController';
import { FIREBASE_CONNCTION_ERROR, FIREBASE_OPERATION_ERROR } from './helpers/errorsCodes';
const { get } = axios;

class Seed {
    clientsURL = process.env.CLIENTS_URL;
    policiesURL = process.env.POLICIES_URL;

    constructor() {
        InitController.on('start', async () => {
            try {
                await this.dropUsers();
                await this.dropPolicies();
                await this.dropClients();

                await this.populateClients();
                await this.populatePolicies();

                await InitController.signOutUser();

                console.log(new ColoredString('Seed successfully executed :)').green());
                process.exit(0);
            } catch(error) {
                this.handleError('executing seed', error);
            }
        });

        InitController.on(
            'end',
            () => console.error(new ColoredString(FIREBASE_CONNCTION_ERROR.message).red())
        );
    }

    handleError(specificMessage = '', error = new Error()) {
        console.error(
            new ColoredString(`${FIREBASE_OPERATION_ERROR.message} ${specificMessage}`).red(),
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
        console.log(new ColoredString('Populating clients...').cyan());
        try {
            const { data: { clients } } = await get(this.clientsURL);
            await InitController.DB.ref('/clients/').set(
                this.convertArrayDataIntoObject(clients)
            );

            console.log(new ColoredString('Clients successfully populated').green());
        } catch(error) {
            this.handleError('populating clients', error);
        }
    }

    async populatePolicies() {
        console.log(new ColoredString('Populating policies...').cyan());
        try {
            const { data: { policies } } = await get(this.policiesURL);
            await InitController.DB.ref('/policies/').set(
                this.convertArrayDataIntoObject(policies)
            );

            console.log(new ColoredString('Policies successfully populated').green());
        } catch(error) {
            this.handleError('populating policies', error);
        }
    }

    async dropClients() {
        console.log(new ColoredString('Dropping clients...').cyan());
        try {
            await InitController.DB.ref('/clients/').remove();
            console.log(new ColoredString('Clients successfully dropped').green());
        } catch(error) {
            this.handleError('dropping clients', error);
        }
    }

    async dropPolicies() {
        console.log(new ColoredString('Dropping policies...').cyan());
        try {
            await InitController.DB.ref('/policies/').remove();
            console.log(new ColoredString('Policies successfully dropped').green());
        } catch(error) {
            this.handleError('dropping policies', error);
        }
    }

    async dropUsers() {
        console.log(new ColoredString('Dropping users...').cyan());
        try {
            await InitController.DB.ref('/users/').remove();
            console.log(new ColoredString('Users successfully dropped').green());
        } catch(error) {
            this.handleError('dropping users', error);
        }
    }
}

export default new Seed();