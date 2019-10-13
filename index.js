require('./helpers/coloredStrings');
const initController = require('./controllers/initController');

function start() {
	console.log('Server will start running soon :)'.cyan);
	/* 3rd party libraries */
	const express = require("express");
	const bodyParser = require("body-parser");
	const app = express();

	/* Import routes */

	const PORT = process.env.PORT || 3000;

	/* Body parser to read json */
	app.use(bodyParser.json());

	/* Define routes */

	app.listen(PORT, () => {
		console.log(('Express server is up and running on port ' + PORT).green);
	});

	return app;
}

function error() {
	console.error('Something went wrong trying to connect :/'.red);
}

initController.on('start', start);
initController.on('end', error);