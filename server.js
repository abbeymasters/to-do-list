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

// Auth
const ensureAuth = require('./public/lib/auth/ensure-auth');
const createAuthRoutes = require('./public/lib/auth/create-auth-routes.js');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash, display_name as "displayName"
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
            INSERT INTO users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `,
        [user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

// setting up authentication routes
app.use('/api/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

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

app.get('/api/test', (req, res) => {
    res.json({
        message: `The user's id is ${req.userId}!`
    });
});

//Starting Server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});