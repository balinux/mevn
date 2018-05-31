const express  = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

const orderRouter = require('./api/routes/orders');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// mongoose
mongoose.connect('mongodb+srv://balinux:123N!NJUTSU@balinuxtravel-aozgg.mongodb.net/test?retryWrites=true', (
  {
    useMongoClient:true
  }
))

// route
app.use('/order', orderRouter)

// Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Aceept, Authorization");
  if(req.method === 'OPTIONS'){
     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE , GET');
      return res.status(200).json({});
     }
  next();
})

app.use((req,res, next) => {
  const error = new Error('Not Found!')
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message:error.message
    }
  })
})

module.exports = app;