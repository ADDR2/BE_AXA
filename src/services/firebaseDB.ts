/* Local libraries */
import InitControllerInstance from '../controllers/initController';
import ClientModel from '../models/ClientModel';
import PolicyModel from '../models/PolicyModel';
import UserModel from '../models/UserModel';

interface ClientToBeCreated {
    id?: string;
    email?: string;
    role?: string;
}

class FirebaseDB {
    static getUserById(id = ''): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            InitControllerInstance.DB.ref(`/users/${id}`).once('value', snapshot => {
                snapshot.exists() && resolve(snapshot.val());
                !snapshot.exists() && reject(new Error('User not found'));
            });
        });
    }

    static getUserByUsername(username = ''): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            InitControllerInstance.DB.ref('/users/').orderByChild('username').equalTo(username).once('value', snapshot => {
                if (snapshot.exists()) {
                    const [ [ id, value ] ] = Object.entries(snapshot.val());
                    resolve({ id, ...(<UserModel>value) });
                } else {
                    reject(new Error('User not found'));
                }
            });
        });
    }

    static getClientByUsername(username = ''): Promise<ClientModel> {
        return new Promise((resolve, reject) => {
            InitControllerInstance.DB.ref('/clients/').orderByChild('email').equalTo(username).once('value', snapshot => {
                if (snapshot.exists()) {
                    const [ [ id, value ] ] = Object.entries(snapshot.val());
                    resolve({ id, ...(<ClientModel>value) });
                } else {
                    reject(new Error('Client not found'));
                }
            });
        });
    }

    static getPolicyById(id = ''): Promise<PolicyModel> {
        return new Promise((resolve, reject) => {
            InitControllerInstance.DB.ref(`/policies/${id}`).once('value', snapshot => {
                snapshot.exists() && resolve(snapshot.val());
                !snapshot.exists() && reject(new Error('Policy not found'));
            });
        });
    }

    static getPoliciesByClientId(clientId = ''): Promise<PolicyModel[]> {
        return new Promise((resolve, reject) => {
            InitControllerInstance.DB.ref('/policies/').orderByChild('clientId').equalTo(clientId).once('value', snapshot => {
                if (snapshot.exists()) {
                    resolve(Object.values(snapshot.val()));
                } else {
                    reject(new Error('Policies not found'));
                }
            });
        });
    }

    static getClientById(id = ''): Promise<ClientModel> {
        return new Promise((resolve, reject) => {
            InitControllerInstance.DB.ref(`/clients/${id}`).once('value', snapshot => {
                snapshot.exists() && resolve(snapshot.val());
                !snapshot.exists() && reject(new Error('Client not found'));
            });
        });
    }

    static getClientByName(name = ''): Promise<ClientModel> {
        return new Promise((resolve, reject) => {
            InitControllerInstance.DB.ref('/clients/').orderByChild('name').equalTo(name).once('value', snapshot => {
                if (snapshot.exists()) {
                    const [ [ , value ] ] = Object.entries(snapshot.val());
                    resolve(<ClientModel>value);
                } else {
                    reject(new Error('Client not found'));
                }
            });
        });
    }

    static setTokenToUser(userId = '', token = '') {
        return InitControllerInstance.DB.ref(`/users/${userId}`).update({ token });
    }

    static removeTokenToUser(userId = '') {
        return InitControllerInstance.DB.ref(`/users/${userId}`).update({ token: null });
    }

    static createUser(client: ClientToBeCreated = {}, password = '') {
        return InitControllerInstance.DB.ref(`/users/${client.id}`).set({
            password,
            username: client.email,
            role: client.role
        });
    }
}

export default FirebaseDB;