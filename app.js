const express = require('express');
const { check, validationResult, query } = require('express-validator');
const mysql = require('mysql');

// Create connection to database
const db = mysql.createConnection({
    host: '::1',
    user: 'root',
    password: 'root',
    database: 'testdb',
});

// Connect to database
db.connect((err) => {
    if (err) throw err;
});

//Setup express app/router
const app = express();
app.use(express.json());
app.set('query parser', 'simple');

//*############//
//* GET ROUTES //
//*############//

//Default Route
app.get(['/', '/api'], (req, res) => {
    return res.send('👽');
});

//Select all rows
app.get('/api/entries', (req, res) => {
    let sql = 'SELECT * FROM entries';
    db.query(sql, (err, result) => {
        if (err) {
            return res.send([{ error: err.code }]);
        }
        return res.send(result);
    });
});

//Query entries using query string values
//Values sanitized using query wildcard and INT conversion
app.get('/api/entries/q', query('*').toInt(), (req, res) => {
    const queryParams = Object.entries(req.query);
    let sqlParams = queryParams
        .map(([key, value], index) => {
            if (index != queryParams.length - 1) {
                return `${key} = ${value} AND`;
            }
            return `${key} = ${value}`;
        })
        .join(' ');
    let sql = `SELECT * FROM entries WHERE ${sqlParams};`;
    console.log(sql);
    db.query(sql, (err, result) => {
        if (err) {
            return res.send([{ error: err.code }]);
        }
        return res.send(result);
    });
});

app.get('/api/hb', (req, res) => {
    return res.send('❤️🍯🐰');
});

//*#############//
//* POST ROUTES //
//*#############//

// Insert row
//app.get('/addtest1', (req, res) => {
//    let test = { value: 'Test One' };
//    let sql = `INSERT INTO tests SET ?`;
//    db.query(sql, test, (err, result) => {
//        if (err) throw err;
//        console.log(result);
//        res.send('Test one was created!');
//    });
//});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
