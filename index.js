const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extend:true}));

app.listen(8080, () => {
    console.log("Listening on 8080");
});

app.use('/api/users', require('./service/user/users'));
app.use('/api/products', require('./service/product/products'));