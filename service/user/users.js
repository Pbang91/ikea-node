const router = require('express').Router();
const getConnection = require('./../../config/database');

router.post('/sign-up', ( req, res ) => {
    let sql = `INSERT INTO users (email, password) VALUES(?, ?)`;
    let param = [req.body.email, req.body.password];
    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    let regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
    if ( !regExp.test(req.body.email) || !regPw.test(req.body.password)) {
        res.send('Invalid User Information');
    } else {
        getConnection(( conn ) => {
            conn.query(`SELECT * FROM users WHERE email="${req.body.email}"`, ( err, row ) => {
                if (err) {
                    console.log(err);
                    throw err;
                } else if ( row.length > 0 ) {
                    res.send('Already Exists eamil');
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