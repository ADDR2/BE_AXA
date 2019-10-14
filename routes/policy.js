/* 3rd party libraries */
const router = require("express").Router();
const passport = require('passport');

/* Local libraries */
const PolicyController = require('../controllers/policyController');

/*
    @param req: request object
    @param res: response object
    function getClientByPolicyId: service that returns the user linked to a policy Id
*/
const getClientByPolicyId = (req, res) => {
    try {
        const { user } = req;
        if (!user) throw new Error('Unable to authenticate user :/');
        if (user.role !== 'admin') throw new Error('Unathorized user :/');

        const { policyId } = req.params;

        if(typeof policyId !== 'string' || !policyId) throw new Error('Invalid policy id');

        PolicyController.getClientByPolicyId(policyId)
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
    function getPoliciesByClientName: service that returns all policies linked to a client
*/
const getPoliciesByClientName = (req, res) => {
    try {
        const { user } = req;
        if (!user) throw new Error('Unable to authenticate user :/');
        if (user.role !== 'admin') throw new Error('Unathorized user :/');

        const { clientName } = req.params;

        if(typeof clientName !== 'string' || !clientName) throw new Error('Invalid client name');

        PolicyController.getPoliciesByClientName(clientName)
            .then(policies => {
                res.status(200).send(policies);
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

if(process.env.NODE_ENV === 'test')
    module.exports = {
        getClientByPolicyId,
        getPoliciesByClientName
    };
else module.exports = router;