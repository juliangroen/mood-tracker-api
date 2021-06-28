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
    console.log('MySQL Connected!');
});

const app = express();

app.get(['/', '/api'], (req, res) => {
    res.send('👽');
});

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

//Select all rows
app.get('/api/entries', (req, res) => {
    let sql = 'SELECT * FROM entries';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Select specific row by id
app.get('/api/entries/:id', (req, res) => {
    let sql = `SELECT * FROM entries WHERE id = "${req.params.id}"`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Select rows with specified mood value

app.get('/api/entries/mood/:mood', (req, res) => {
    let sql = `SELECT * FROM entries WHERE mood = "${req.params.mood}"`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/api/hb', (req, res) => {
    res.send('❤️🍯🐰');
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
