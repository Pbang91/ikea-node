const express = require('express');
const mysql = require('mysql2') //mysql로 진행 시 1025 error
const app = express();
const db = require('./config/database');

app.listen(8080, () => {
    console.log("Listening on 8080");
});

const connection = mysql.createConnection(db);
connection.connect();

app.get('/users', ( req, res ) => {
    connection.query(
        'SELECT * FROM users', ( err, rows ) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                res.send(rows)
            }
        }
    );
});

app.post('/users', ( req, res ) => {
    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    let regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    if ( !regExp.test(req.body.email) || !regPw.test(req.body.password)) {
        res.send('Invalid User Information');
    } else {
        connection.query(`SELECT * FROM users WHERE email=${req.body.email}`, ( err, row ) => {
            if (err) {
                console.log(err);
                throw err;
            } else if ( row ) {
                res.send('Already Exists email')
            } else {
                connection.query(`INSERT INTO TABLE users VALUES (${req.body.email}, ${req.body.password})`)
            }
        });
    }
});