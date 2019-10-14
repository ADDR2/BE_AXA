/* 3rd party libraries */
const router = require("express").Router();
const passport = require('passport');

/* Local libraries */
const ClientController = require('../controllers/clientController');

/*
    @param req: request object
    @param res: response object
    function getClientById: service that returns a client filtered by Id
*/
const getClientById = (req, res) => {
    try {
        const { user } = req;
        if (!user) throw new Error('Unable to authenticate user :/');
        if (user.role !== 'users' && user.role !== 'admin') throw new Error('Unathorized user :/');

        const { clientId } = req.params;

        if(typeof clientId !== 'string' || !clientId) throw new Error('Invalid client id');

        ClientController.getClientById(clientId)
            .then(client => {
                res.status(200).send(client);
            })
            .catch(error => {
                console.error(error.message.red);
                res.status(error.httpCode).send(error.message);
            })
        ;
    } catch (error) {
        res.status(400).send(error.message);
        process.env.NODE_ENV !== 'test' && console.error(error.message.red);
    }
};

/*
    @param req: request object
    @param res: response object
    function getClientByName: service that returns a client filtered by name
*/
const getClientByName = (req, res) => {
    try {
        const { user } = req;
        if (!user) throw new Error('Unable to authenticate user :/');
        if (user.role !== 'users' && user.role !== 'admin') throw new Error('Unathorized user :/');

        const { clientName } = req.params;

        if(typeof clientName !== 'string' || !clientName) throw new Error('Invalid client name');

        ClientController.getClientByName(clientName)
            .then(client => {
                res.status(200).send(client);
            })
            .catch(error => {
                console.error(error.message.red);
                res.status(error.httpCode).send(error.message);
            })
        ;
    } catch (error) {
        res.status(400).send(error.message);
        process.env.NODE_ENV !== 'test' && console.error(error.message.red);
    }
};

/*
Route of getClientByName service
Example of use:
    method: GET
    url: "http://localhost:3000/clients/name/lapo"
*/
router.get("/name/:clientName", passport.authenticate('jwt', { session: false }), getClientByName);

/*
Route of getClientById service
Example of use:
    method: GET
    url: "http://localhost:3000/clients/345678594"
*/
router.get("/:clientId", passport.authenticate('jwt', { session: false }), getClientById);

if(process.env.NODE_ENV === 'test')
    module.exports = {
        getClientById,
        getClientByName
    };
else module.exports = router;