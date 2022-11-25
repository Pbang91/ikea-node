const getConnection = require('./../config/database');
const fs = require('fs');
const path = require('path');

const uploadCsv = (fileName, tableName) => {
    const csvPath = path.join(__dirname, "..", "dummy", fileName);
    const csv = fs.readFileSync(csvPath, "utf-8");

    const rows = csv.split("\r\n");
    const columnTitle = rows[0].split(",").join(",");

    let sql = `INSERT INTO ${tableName} (${columnTitle}) VALUES `;
    let data = ""

    for (let i = 1; i < rows.length -1; i++) {
        data += `(${rows[i]}), `;
    }
    sql += `${data.slice(0, data.length-2)};`;

    getConnection( (conn) => {
        conn.query(sql, ( err, result ) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                console.log("완료");
            }
        });
    });
}

module.exports = uploadCsv;