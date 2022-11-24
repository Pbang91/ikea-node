const env = require('./../env');
const mysql = require('mysql2') //mysql로 진행 시 1025 error -> mysql2로 변경

const db = {
    host     : env.dbInfo.host,
    user     : env.dbInfo.user,
    password : env.dbInfo.password,
    database : env.dbInfo.database
}

const pool = mysql.createPool(db);

function getConnection( callback ){
    pool.getConnection( ( err, conn ) => {
        if (!err) {
            callback(conn)
        }
    });
}

module.exports = getConnection;