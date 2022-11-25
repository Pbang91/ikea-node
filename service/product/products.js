const router = require('express').Router();
const getConnection = require('./../../config/database');

router.get('/product', ( req, res ) => {
    let subCategoryId = req.query.sub_category_id;
    let limit = req.query.limit
    let offset = req.query.offset
    let sortOption = req.query.sort
    let filterBoolena = req.query.filter_boolean

    if (limit === undefined) {
        limit = 10;
    }
    if (offset === undefined) {
        offset = 0;
    }
    if (sortOption === undefined) {
        sortOption = "default";
    }
    if (filterBoolena === undefined) {
        filterBoolena = false;
    }

    

});