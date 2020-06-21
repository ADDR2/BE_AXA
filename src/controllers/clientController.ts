/* Local libraries */
import HttpError from '../helpers/httpError';
import { CLIENT_NOT_FOUND } from '../helpers/errorsCodes';
import FirebaseDB from '../services/firebaseDB';
import ColoredString from '../helpers/coloredStrings';

class ClientController {
    static async getClientById(clientId = '') {
        try {
            return await FirebaseDB.getClientById(clientId);
        } catch(error) {
            console.error(new ColoredString(error.message).red());
            throw new HttpError(CLIENT_NOT_FOUND);
        }
    }

    static async getClientByName(clientName = '') {
        try {
            return await FirebaseDB.getClientByName(clientName);
        } catch(error) {
            console.error(new ColoredString(error.message).red());
            throw new HttpError(CLIENT_NOT_FOUND);
        }
    }
}

export default ClientController;