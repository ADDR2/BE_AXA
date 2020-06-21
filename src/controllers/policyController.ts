/* Local libraries */
import HttpError from '../helpers/httpError';
import { CLIENT_NOT_FOUND, POLICIES_NOT_FOUND } from '../helpers/errorsCodes';
import FirebaseDB from '../services/firebaseDB';
import ClientController from './clientController';
import ColoredString from '../helpers/coloredStrings';

class PolicyController {
    static async getClientByPolicyId(policyId = '') {
        try {
            const { clientId } = await FirebaseDB.getPolicyById(policyId);
            return await ClientController.getClientById(clientId);
        } catch(error) {
            console.error(new ColoredString(error.message).red());
            throw new HttpError(CLIENT_NOT_FOUND);
        }
    }

    static async getPoliciesByClientName(clientName = '') {
        try {
            const { id } = await ClientController.getClientByName(clientName);
            return await FirebaseDB.getPoliciesByClientId(id);
        } catch(error) {
            console.error(new ColoredString(error.message).red());
            throw new HttpError(POLICIES_NOT_FOUND);
        }
    }
}

export default PolicyController;