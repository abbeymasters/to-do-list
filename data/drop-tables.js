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
            DROP TABLE IF EXISTS todos;
            DROP TABLE IF EXISTS users;
    `);
    })
    .then(
        () => console.log('drop tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });