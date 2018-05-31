const express = require('express');
const router =  express.Router();

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
    
  res.status(200).json({
      message: "handle post Message",
      order:orderTravel
  })
})

module.exports = router;