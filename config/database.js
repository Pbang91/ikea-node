const dbInfo = require('./env');
const db = {
    host     : dbInfo.host,
    user     : dbInfo.user,
    password : dbInfo.password,
    database : dbInfo.database
}

module.exports = db;