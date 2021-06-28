const express = require('express');
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

const app = express();

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

// Get entries containing one or more key value pairs via query string
app.get('/api/entries/q', (req, res) => {
    const queryParams = Object.entries(req.query);
    let sqlParams = ``;
    queryParams.map(([key, value], index) => {
        const safeKey = key.trim().split(' ', 1);

        // ternary to check if value is an array due to duplicate query string keys
        const safeValue = Array.isArray(value)
            ? Number(value[0].trim().split(' ', 1))
            : Number(value.trim().split(' ', 1));

        sqlParams += `${safeKey} = ${safeValue}`;
        if (index != queryParams.length - 1) {
            sqlParams += ` AND `;
        }
    });
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
