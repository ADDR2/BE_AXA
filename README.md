# BE_AXA

This project was developed with Node (`v10.15.1`). The project exposes an http server for handling policies and clients.

## Instructions before running

The first step will be to install dependencies by running the following command:

```
$> npm install
```

After that you'll need to add your firebase project keys to the environment file. For that, just add a folder called `config` at the top level of the project and add a file called `.env.development` inside of it.

The environment file should look like the following example:

```
SECRET=YOUR_SECRET
PORT=3000
SEED_EMAIL=amarito93@gmail.com
SEED_PWD=dude345@
CLIENTS_URL=YOUR_KEY
POLICIES_URL=YOUR_KEY
FIREBASE_API_KEY=YOUR_KEY
FIREBASE_AUTH_DOMAIN=YOUR_KEY
FIREBASE_DATABASE_URL=YOUR_KEY
FIREBASE_PROJECT_ID=YOUR_KEY
FIREBASE_STORAGE_BUCKET=YOUR_KEY
FIREBASE_MESSAGING_SENDER_ID=YOUR_KEY
FIREBASE_APP_ID=YOUR_KEY
```

Now you can run the seed file to populate your database :). For that, just run the following command:

```
$> npm run seed
```

If everything goes well, you'll be able to see your database populated with `clients` and `policies`.

## To run

And finally you are able to run the project by executing this command:

```
$> npm start
```

If everything goes well, you'll see these 3 messages:

```
Connected to Firebase :)
Server will start running soon :)
Express server is up and running on port YOUR_PORT
```

## HTTP exposed endpoints

This project exposes 7 endpoints, and those are listed below.

### User endpoints (sign in, sign up and sign out)

```
method: POST
url: "http://localhost:YOUR_PORT/users/login"
body: {
  username: 'username',
  password: 'password'
}
```

```
method: POST
url: "http://localhost:YOUR_PORT/users/signup"
body: {
  username: 'username',
  password: 'password'
}
```

```
method: POST
url: "http://localhost:YOUR_PORT/users/logout"
required headers: {
	Authorization: 'Bearer YOUR_TOKEN'
}
```

### Client endpoints (getClientByName and getClientById)

```
method: GET
url: "http://localhost:YOUR_PORT/clients/name/CLIENT_NAME"
required headers: {
	Authorization: 'Bearer YOUR_TOKEN'
}
```

```
method: GET
url: "http://localhost:YOUR_PORT/clients/CLIENT_ID"
required headers: {
	Authorization: 'Bearer YOUR_TOKEN'
}
```

### Policy endpoints (getPoliciesByClientName and getClientByPolicyId)

```
method: GET
url: "http://localhost:YOUR_PORT/policies/client/CLIENT_NAME"
required headers: {
	Authorization: 'Bearer YOUR_TOKEN'
}
```

```
method: GET
url: "http://localhost:YOUR_PORT/policies/POLICY_ID"
required headers: {
	Authorization: 'Bearer YOUR_TOKEN'
}
```