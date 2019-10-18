/* 3rd party libraries */
require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` });

/* Local libraries */
require('./helpers/coloredStrings');
const { FIREBASE_CONNCTION_ERROR } = require('./helpers/errorsCodes');
const InitController = require('./controllers/initController');

function start() {
	console.log('Server will start running soon :)'.cyan);
	/* 3rd party libraries */
	const passport = require('passport');
	const morgan = require('morgan');
	const express = require("express");
	const bodyParser = require("body-parser");
	const app = express();

	/* Import middlewares */
	const authentication = require('./middlewares/authentication');

	/* Import routes */
	const userRoutes = require('./routes/user');
	const clientRoutes = require('./routes/client');
	const policyRoutes = require('./routes/policy');

	const PORT = process.env.PORT;

	/* Set authentication */
	passport.use(authentication);

	/* Body parser to read json */
	app.use(bodyParser.json());

	/* Express logger */
	app.use(morgan('combined'));

	/* Define routes */
	app.use("/users", userRoutes);
	app.use("/clients", clientRoutes);
	app.use("/policies", policyRoutes);

	app.listen(PORT, () => {
		console.log(('Express server is up and running on port ' + PORT).green);
	});

	return app;
}

function error() {
	console.error(FIREBASE_CONNCTION_ERROR.message.red);
	process.exit(1);
}

InitController.on('start', start);
InitController.on('end', error);

process.on('SIGINT', async () => {
	await InitController.signOutUser();
});

process.on('SIGTERM', async () => {
	await InitController.signOutUser();
});