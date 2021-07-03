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
    console.log('Database Connected!');
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
    return res.status(200).send('👽');
});

//Select all rows
app.get('/api/entries', (req, res) => {
    let sql = 'SELECT * FROM entries';
    db.query(sql, (err, result) => {
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
    const sql = db.format(
        `SELECT * FROM entries WHERE ${placeholders}`,
        queryParams.flat()
    );

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(400).send({
                error: { error_num: err.errno, error_code: err.code },
            });
        }
        return res.status(200).send(result);
    });
});

//app.get('/api/entries/q', (req, res) => {
//    const queryParams = Object.entries(req.query);
//    let sqlParams = queryParams
//        .map(([key, value], index) => {
//            const safeKey = db.escapeId(key);
//            const safeValue = db.escape(value);
//            //const safeValue = Number(value.trim());
//            if (index != queryParams.length - 1) {
//                return `${safeKey} = ${safeValue} AND`;
//            }
//            return `${safeKey} = ${safeValue}`;
//        })
//        .join(' ');
//    let sql = `SELECT * FROM entries WHERE ${sqlParams};`;
//    console.log(sql);
//    db.query(sql, (err, result) => {
//        if (err) {
//            return res.send([{ error: err.code }]);
//        }
//        return res.send(result);
//    });
//});

app.get('/api/hb', (req, res) => {
    return res.status(200).send('❤️🍯🐰');
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
