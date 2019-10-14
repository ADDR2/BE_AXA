/* Local libraries */
const HttpError = require('../helpers/httpError');
const { CLIENT_NOT_FOUND, POLICIES_NOT_FOUND } = require('../helpers/errorsCodes');
const FirebaseDB = require('../services/firebaseDB');
const ClientController = require('./clientController');

class PolicyController {
    static async getClientByPolicyId(policyId = '') {
        try {
            const { clientId } = await FirebaseDB.getPolicyById(policyId);
            return await ClientController.getClientById(clientId);
        } catch(error) {
            console.error(error.message.red);
            throw new HttpError(CLIENT_NOT_FOUND);
        }
    }

    static async getPoliciesByClientName(clientName = '') {
        try {
            const { id } = await ClientController.getClientByName(clientName);
            return await FirebaseDB.getPoliciesByClientId(id);
        } catch(error) {
            console.error(error.message.red);
            throw new HttpError(POLICIES_NOT_FOUND);
        }
    }
}

module.exports = PolicyController;