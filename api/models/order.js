const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name:String,
  email:String
})

module.exports = mongoose.model('Order', orderSchema);