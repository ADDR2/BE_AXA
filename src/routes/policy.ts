/* 3rd party libraries */
import express, { Response } from "express";
import passport from 'passport';

/* Local libraries */
import HttpError from '../helpers/httpError';
import {
    INVALID_REQUEST_DATA,
    AUTHENTICATION_FAILURE,
    AUTHORIZATION_FAILURE
} from '../helpers/errorsCodes';
import PolicyController from '../controllers/policyController';
import RequestWithAuthenticatedUser from '../models/RequestWithAuthenticatedUser';
import ColoredString from '../helpers/coloredStrings';
const router = express.Router();

/*
    @param req: request object
    @param res: response object
    function getClientByPolicyId: service that returns the user linked to a policy Id
*/
const getClientByPolicyId = (req: RequestWithAuthenticatedUser, res: Response) => {
    try {
        const { user } = req;
        if (!user) throw new HttpError(AUTHENTICATION_FAILURE);
        if (user.role !== 'admin') throw new HttpError(AUTHORIZATION_FAILURE);

        const { policyId } = req.params;

        if(typeof policyId !== 'string' || !policyId) throw new HttpError({
            ...INVALID_REQUEST_DATA,
            message: INVALID_REQUEST_DATA.message + 'policy id'
        });

        PolicyController.getClientByPolicyId(policyId)
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
        process.env.NODE_ENV !== 'test' && console.error(new ColoredString(error.message).red());
    }
};

/*
    @param req: request object
    @param res: response object
    function getPoliciesByClientName: service that returns all policies linked to a client
*/
const getPoliciesByClientName = (req: RequestWithAuthenticatedUser, res: Response) => {
    try {
        const { user } = req;
        if (!user) throw new HttpError(AUTHENTICATION_FAILURE);
        if (user.role !== 'admin') throw new HttpError(AUTHORIZATION_FAILURE);

        const { clientName } = req.params;

        if(typeof clientName !== 'string' || !clientName) throw new HttpError({
            ...INVALID_REQUEST_DATA,
            message: INVALID_REQUEST_DATA.message + 'client name'
        });

        PolicyController.getPoliciesByClientName(clientName)
            .then(policies => {
                res.status(200).send(policies);
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
        process.env.NODE_ENV !== 'test' && console.error(new ColoredString(error.message).red());
    }
};

/*
Route of getPoliciesByClientName service
Example of use:
    method: GET
    url: "http://localhost:3000/policies/client/lapo"
*/
router.get("/client/:clientName", passport.authenticate('jwt', { session: false }), getPoliciesByClientName);

/*
Route of getClientByPolicyId service
Example of use:
    method: GET
    url: "http://localhost:3000/policies/345678594"
*/
router.get("/:policyId", passport.authenticate('jwt', { session: false }), getClientByPolicyId);

export default router;