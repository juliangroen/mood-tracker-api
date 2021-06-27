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

// Create table
app.get('/createtable', (req, res) => {
    let sql =
        'CREATE TABLE tests(id int AUTO_INCREMENT, value VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table was created!');
    });
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
app.get('/tests', (req, res) => {
    let sql = 'SELECT * FROM tests';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Select specific row
app.get('/tests/:id', (req, res) => {
    let sql = `SELECT * FROM tests WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
