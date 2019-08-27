// make sure .env has been loaded
require('dotenv').config();
// "require" pg (after `npm i pg`)
const pg = require('pg');
// Use the pg Client
const Client = pg.Client;
// note: you will need to create the database!
const client = new Client(process.env.DATABASE_URL);
// export the client
module.exports = client;

client.connect()
    .then(() => {
        return client.query(`
            CREATE TABLE todos (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL UNIQUE,
                finished BOOLEAN NOT NULL DEFAULT FALSE
            );
        `);
    })
    .then(
        () => console.log('create tables finished'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });