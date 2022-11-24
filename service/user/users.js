const router = require('express').Router();
const bcrypt = require('bcrypt');
const getConnection = require('./../../config/database');
const usersUtil = require('./utils');

router.post('/login', ( req, res ) => {
    let email = req.body.email;
    let password = req.body.password;

    getConnection(( conn ) => {
        let sql = `SELECT * FROM users WHERE email="${email}"`

        conn.query(sql, ( err, row ) => {
            if (err) {
                console.log(err);
                throw err;
            } else if ( row.length == 0 ) {
                res.status(400).send({message : "Invalid Email"});
            } else {
                let user = row[0];
                let checkPassword = usersUtil.comparePassword(password, user.password);
                
                if (checkPassword) {
                    let accessToken = usersUtil.createAccessToken(userId=user.id)
                    res.status(200).send({
                        message : "Success",
                        accessToken});
                } else {
                    res.status(400).send({message : "Invalid Password"});
                }
            }
        });
    });
});

router.post('/sign-up', ( req, res ) => {
    let regexResult = usersUtil.checkRegex(req.body.email, req.body.password);

    if (regexResult) {
        getConnection(( conn ) => {
            let sql = `INSERT INTO users (email, password) VALUES(?, ?)`;
            let hashedPassword = usersUtil.hashPassword(req.body.password);
            let param = [req.body.email, hashedPassword];

            conn.query(`SELECT * FROM users WHERE email="${req.body.email}"`, ( err, row ) => {
                if (err) {
                    console.log(err);
                    throw err;
                } else if ( row.length > 0 ) {
                    res.status(400).send('Already Exists eamil');
                } else {
                    conn.query(sql, param, ( err, result, field) => {
                        if (err) {
                            res.status(500).send({message : "Internal Server Error"});
                        } else {
                            let message = {
                                message : "success",
                                userId : result.insertId
                            }

                            res.status(201).send(message);
                        }
                    })
                }
            });
        });
    } else {
        res.status(400).send({message : "Invalid User Information"});
    }
});

router.get('/', ( req, res ) => {
    getConnection(( conn ) => {
        conn.query(
            'SELECT * FROM users', ( err, rows ) => {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    res.status(200).send(rows)
                }
            }
        );
    });
});

module.exports = router;