const express = require('express');
const mysql = require('mysql');

// Create connection to database
const db = mysql.createPool({
    connectionLimit: 10,
    host: '::1',
    user: 'root',
    password: 'root',
    database: 'testdb',
});

// Connect to database
//db.getConnection((err) => {
//    if (err) throw err;
//    console.log('Database Connected!');
//});

//Setup express router with middleware
const app = express();
app.use(express.json());
app.set('query parser', 'simple');

//*############//
//* GET ROUTES //
//*############//

//Default Routes
app.get(['/', '/api'], (req, res) => {
    return res.status(200).send('👽');
});

//Return all rows from entries table
app.get('/api/entries', (req, res) => {
    let sql = 'SELECT * FROM entries';
    const query = db.query(sql, (err, result) => {
        if (err) {
            return res.status(400).send({
                error: { error_num: err.errno, error_code: err.code },
            });
        }
        return res.status(200).send(result);
    });
});

//Return all rows from entries table
app.get('/api/entries/id/:id', (req, res) => {
    let sql = `SELECT * FROM entries WHERE id = ?`;
    const query = db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return res.status(400).send({
                error: { error_num: err.errno, error_code: err.code },
            });
        }
        return res.status(200).send(result);
    });
});

//Query entries using query string values
//Keys and values escaped using node mysql package .format() method.
app.get('/api/entries/q', (req, res) => {
    const queryParams = Object.entries(req.query);

    //append placeholders for each key value pair and then slice off the last "AND"
    const placeholders = '?? = ? AND '.repeat(queryParams.length).slice(0, -5);

    //using mysql module's .format() which uses .escapeId() for keys and .escape() for values
    const sql = mysql.format(
        `SELECT * FROM entries WHERE ${placeholders}`,
        queryParams.flat()
    );

    const query = db.query(sql, (err, result) => {
        if (err) {
            return res.status(400).send({
                error: { error_num: err.errno, error_code: err.code },
            });
        }
        return res.status(200).send(result);
    });
});

app.get('/api/hb', (req, res) => {
    return res.status(200).send('❤️🍯🐰');
});

//*#############//
//* POST ROUTES //
//*#############//

// Insert a new entry into the entries table
// values are expected as a JSON object via the req.body and auto escaped within the mysql.query() function
app.post('/api/entries', (req, res) => {
    const sql = `INSERT INTO entries SET ?`;
    const query = db.query(sql, req.body, (err, result) => {
        if (err) {
            return res.status(400).send({
                error: { error_num: err.errno, error_code: err.code },
            });
        }
        return res.status(200).send(result);
    });
});

//*############//
//* PUT ROUTES //
//*############//

// Update an entry in the entries table by id number
// values are expected as a JSON object via the req.body and auto escaped within the mysql.query() function
app.post('/api/entries/id/:id', (req, res) => {
    const sql = `UPDATE entries SET ? WHERE id = ?`;
    const query = db.query(sql, [req.body, req.params.id], (err, result) => {
        if (err) {
            return res.status(400).send({
                error: { error_num: err.errno, error_code: err.code },
            });
        }
        return res.status(200).send(result);
    });
});

//*###############//
//* DELETE ROUTES //
//*###############//

// Delete an entry in the entries table by id number
// id value escaped via the mysql.query() function

app.delete('/api/entries/id/:id', (req, res) => {
    const sql = `DELETE FROM entries WHERE id = ?`;
    const query = db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return res.status(400).send({
                error: { error_num: err.errno, error_code: err.code },
            });
        }
        return res.status(200).send(result);
    });
});

//*##############//
//* START SERVER //
//*##############//

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
