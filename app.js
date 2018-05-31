const express  = require('express');
const app = express();

const orderRouter = require('./api/routes/orders');


app.use('/order', orderRouter)

module.exports = app;