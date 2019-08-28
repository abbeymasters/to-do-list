// Load Environment Variables from the .env file
require('dotenv').config();

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

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Database Client
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data


app.get('/api/todos', (req, res) => {
    const showAll = (req.query.show && req.query.show.toLowerCase() === 'all');
    const where = showAll ? '' : 'WHERE finished = FALSE';

    client.query(`
        SELECT
            id, 
            name,
            finished AS inactive
        FROM todos
        ${where}
        ORDER BY name;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message | err
            });
        });
});

app.post('/api/todos', (req, res) => {
    const todo = req.body;
    client.query(`
        INSERT INTO todos (name)
        VALUES ($1)
        RETURNING *;
    `, 
    [todo.name]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Todo "${todo.name}" already exists.`
                });
            }
            res.status(500).json({
                error: err.message | err
            });
        });
});

app.put('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = req.body;

    client.query(`
        UPDATE todos
        SET name = $2,
            finished = $3
        WHERE   id = $1
        RETURNING *;
    `,
    [id, todo.name, todo.inactive]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error:  `Todo "${todo.name}" already exists.`
                });
            }
            res.status(500).json({
                error: err.message | err
            });
        });
});

app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;

    client.query(`
        DELETE FROM todos
        WHERE id = $1
        RETURNING *;
    `,
    [id]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23503') {
                res.status(400).json({
                    error: `Could not remove, to-do is in use. Make inactive or delete all tasks with that type first.`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

//Starting Server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});