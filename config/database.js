const dbInfo = require('./../env');
const mysql = require('mysql2') //mysql로 진행 시 1025 error -> mysql2로 변경

const db = {
    host     : dbInfo.host,
    user     : dbInfo.user,
    password : dbInfo.password,
    database : dbInfo.database
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