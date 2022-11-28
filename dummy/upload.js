const uploadCsv = require('./common')
// const FILE_NAME = "main_category.csv";
// const FILE_NAME = "sub_category.csv"
// const TABLE_NAME = "sub_categories"

// let tableList = [
//     [""]
// ]
const FILE_NAME = "product.csv"
const TABLE_NAME = "products"
uploadCsv(FILE_NAME, TABLE_NAME);