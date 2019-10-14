/* 3rd party libraries */
const router = require("express").Router();
const passport = require('passport');

/* Local libraries */
const HttpError = require('../helpers/httpError');
const {
    INVALID_REQUEST_DATA,
    AUTHENTICATION_FAILURE,
    AUTHORIZATION_FAILURE
} = require('../helpers/errorsCodes');
const ClientController = require('../controllers/clientController');

/*
    @param req: request object
    @param res: response object
    function getClientById: service that returns a client filtered by Id
*/
const getClientById = (req, res) => {
    try {
        const { user } = req;
        if (!user) throw new HttpError(AUTHENTICATION_FAILURE);
        if (user.role !== 'user' && user.role !== 'admin') throw new HttpError(AUTHORIZATION_FAILURE);

        const { clientId } = req.params;

        if(typeof clientId !== 'string' || !clientId) throw new HttpError({
            ...INVALID_REQUEST_DATA,
            message: INVALID_REQUEST_DATA.message + 'client id'
        });

        ClientController.getClientById(clientId)
            .then(client => {
                res.status(200).send(client);
            })
            .catch(error => {
                res.status(error.httpCode).send(error.message);
            })
        ;
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.httpCode).send(error.message);
        } else {
            res.status(INVALID_REQUEST_DATA.httpCode).send(INVALID_REQUEST_DATA.message);
        }
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
        if (!user) throw new HttpError(AUTHENTICATION_FAILURE);
        if (user.role !== 'user' && user.role !== 'admin') throw new HttpError(AUTHORIZATION_FAILURE);

        const { clientName } = req.params;

        if(typeof clientName !== 'string' || !clientName) throw new HttpError({
            ...INVALID_REQUEST_DATA,
            message: INVALID_REQUEST_DATA.message + 'client name'
        });

        ClientController.getClientByName(clientName)
            .then(client => {
                res.status(200).send(client);
            })
            .catch(error => {
                res.status(error.httpCode).send(error.message);
            })
        ;
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.httpCode).send(error.message);
        } else {
            res.status(INVALID_REQUEST_DATA.httpCode).send(INVALID_REQUEST_DATA.message);
        }
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