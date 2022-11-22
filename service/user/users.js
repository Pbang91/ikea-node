const router = require('express').Router();
const bcrypt = require('bcrypt');
const getConnection = require('./../../config/database');

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
                res.status(400).send({message : "Invalid Password"});
            } else {
                let user = row[0];
                // console.log(row[0].password);
                let checkPassword = bcrypt.compareSync(password, user.password);

                if (checkPassword) {
                    res.status(200).send({message : "Success", userId : user.id});
                } else {
                    res.status(400).send({message : "Invalid Password"});
                }
            }
        });
    });
});

router.post('/sign-up', ( req, res ) => {
    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    let regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
    if ( !regExp.test(req.body.email) || !regPw.test(req.body.password)) {
        res.send('Invalid User Information');
    } else {
        getConnection(( conn ) => {
            let sql = `INSERT INTO users (email, password) VALUES(?, ?)`;
            let hashedPassword = bcrypt.hashSync(req.body.password, 10);
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
                            var message = {
                                message : "success",
                                userId  : result.insertId
                            }
                            res.status(200).send(message);
                        }
                    })
                }
            });
        });
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
                    res.send(rows)
                }
            }
        );
    });
});

module.exports = router;