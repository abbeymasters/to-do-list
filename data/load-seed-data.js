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

const todos = require('./todos.js');

client.connect()
    .then(() => {
        return Promise.all(
            todos.map(todo => {
                return client.query(`
                    INSERT INTO todos (name)
                    VALUES ($1)
                    RETURNING *;
                `,
                [todo])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });