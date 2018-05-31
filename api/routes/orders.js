const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/',(req,res,next) => {
  res.status(200).json({
      message: "handle get Message"
  })
})

router.post('/',(req,res,next) => {
  const orderTravel = {
    name:req.body.name,
    email: req.body.email
  }
  
  const order = new Order({
    _id:mongoose.Types.ObjectId(),
    name:req.body.name,
    email:req.body.email
  })
  
  order
    .save()
    .then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })
  
  
  res.status(200).json({
      message: "handle post Message",
      order:orderTravel
  })
})

module.exports = router;