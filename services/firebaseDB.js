/* Local libraries */
const { DB } = require('../controllers/initController');

class FirebaseDB {
    static getUserById(id = '') {
        return new Promise((resolve, reject) => {
            DB.ref(`/users/${id}`).once('value', snapshot => {
                snapshot.exists() && resolve(snapshot.val());
                !snapshot.exists() && reject(new Error('User not found'));
            });
        });
    }

    static getUserByUsername(username = '') {
        return new Promise((resolve, reject) => {
            DB.ref('/users/').orderByChild('username').equalTo(username).once('value', snapshot => {
                if (snapshot.exists()) {
                    const [ [ id, value ] ] = Object.entries(snapshot.val());
                    resolve({ id, ...value });
                } else {
                    reject(new Error('User not found'));
                }
            });
        });
    }

    static getClientByUsername(username = '') {
        return new Promise((resolve, reject) => {
            DB.ref('/clients/').orderByChild('email').equalTo(username).once('value', snapshot => {
                if (snapshot.exists()) {
                    const [ [ id, value ] ] = Object.entries(snapshot.val());
                    resolve({ id, ...value });
                } else {
                    reject(new Error('Client not found'));
                }
            });
        });
    }

    static getPolicyById(id = '') {
        return new Promise((resolve, reject) => {
            DB.ref(`/policies/${id}`).once('value', snapshot => {
                snapshot.exists() && resolve(snapshot.val());
                !snapshot.exists() && reject(new Error('Policy not found'));
            });
        });
    }

    static getPoliciesByClientId(clientId = '') {
        return new Promise((resolve, reject) => {
            DB.ref('/policies/').orderByChild('clientId').equalTo(clientId).once('value', snapshot => {
                if (snapshot.exists()) {
                    resolve(Object.values(snapshot.val()));
                } else {
                    reject(new Error('Policies not found'));
                }
            });
        });
    }

    static getClientById(id = '') {
        return new Promise((resolve, reject) => {
            DB.ref(`/clients/${id}`).once('value', snapshot => {
                snapshot.exists() && resolve(snapshot.val());
                !snapshot.exists() && reject(new Error('Client not found'));
            });
        });
    }

    static getClientByName(name = '') {
        return new Promise((resolve, reject) => {
            DB.ref('/clients/').orderByChild('name').equalTo(name).once('value', snapshot => {
                if (snapshot.exists()) {
                    const [ [ id, value ] ] = Object.entries(snapshot.val());
                    resolve(value);
                } else {
                    reject(new Error('Client not found'));
                }
            });
        });
    }

    static setTokenToUser(userId = '', token = '') {
        return DB.ref(`/users/${userId}`).update({ token });
    }

    static removeTokenToUser(userId = '') {
        return DB.ref(`/users/${userId}`).update({ token: null });
    }

    static createUser(client = {}, password = '') {
        return DB.ref(`/users/${client.id}`).set({
            password,
            username: client.email,
            role: client.role
        });
    }
}

module.exports = FirebaseDB;