const router = require('express').Router();
const getConnection = require('./../../config/database');

router.get('/:category', ( req, res ) => {
    let category = req.params['category']
    console.log(req.query);
    console.log(req.query.filters.split('-'));

    let sort = {
        "PRICE_LOW_TO_HIGH" : "ASC",
        "PRICE_HIGH_TO_LOW" : "DESC"
    }

    let sort_query = sort[req.query.sort] || "";
    
    filters = {
        colors,
        price
    }

    let sql = `SELECT * FROM sub_categories AS s LEFT JOIN products AS p ON s.id = p.sub_category_id WHERE s.name="${category}";`
    getConnection((conn) => {
        conn.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                res.status(200).send(rows)
            }
        });
    });
});

module.exports = router;