/* 3rd party libraries */
require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` });
import passport from 'passport';
import morgan from 'morgan';
import express from "express";
import bodyParser from "body-parser";

/* Import middlewares */
import authentication from './middlewares/authentication';

/* Import routes */
import userRoutes from './routes/user';
import clientRoutes from './routes/client';
import policyRoutes from './routes/policy';

/* Local libraries */
import ColoredString from './helpers/coloredStrings';
import { FIREBASE_CONNCTION_ERROR } from './helpers/errorsCodes';
import InitController from './controllers/initController';

function start() {
	console.log(new ColoredString('Server will start running soon :)').cyan());
	const app = express();

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
		console.log(new ColoredString('Express server is up and running on port ' + PORT).green());
	});

	return app;
}

function error() {
	console.error(new ColoredString(FIREBASE_CONNCTION_ERROR.message).red());
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