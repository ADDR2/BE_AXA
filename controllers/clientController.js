/* Local libraries */
const HttpError = require('../helpers/httpError');
const { CLIENT_NOT_FOUND } = require('../helpers/errorsCodes');
const FirebaseDB = require('../services/firebaseDB');

class ClientController {
    static async getClientById(clientId = '') {
        try {
            return await FirebaseDB.getClientById(clientId);
        } catch(error) {
            console.error(error.message.red);
            throw new HttpError(CLIENT_NOT_FOUND);
        }
    }

    static async getClientByName(clientName = '') {
        try {
            return await FirebaseDB.getClientByName(clientName);
        } catch(error) {
            console.error(error.message.red);
            throw new HttpError(CLIENT_NOT_FOUND);
        }
    }
}

module.exports = ClientController;