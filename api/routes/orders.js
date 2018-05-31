const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/',(req,res,next) => {
  Order
    .find()
    .exec()
    .then(docs => {
    console.log(docs)
    res.status(200).json(docs);
  }).catch(error => {
    console.log(error)
      res.status(500).json({
        error: error
      });
  })
  // res.status(200).json({
  //     message: "handle get Message"
  // })
})

router.post('/',(req,res,next) => {
  const orderTravel = {
    name:req.body.name,
    email: req.body.email
  }
  
  const order = new Order({
    _id:new mongoose.Types.ObjectId(),
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
      order:order
  })
})

// detail order

router.get('/:orderId',(req, res, next) => {
  const id = req.params.orderId;
  
  Order
    .findById(id)
    .then(result => {
    console.log(result)
    res.status(200).json(result)
  }).catch(error => {
    console.log(error)
    res.status(500).json({error:error})    
  })
})

router.delete('/:orderId', (req, res, next) => {
  const id = req.params.id;
  
  Order
    .remove({_id:id})
    .exec()
    .then(result => {
    console.log(result)
    res.status(200).json(result)
  })
    .catch(error => {
  console.log(error)
    res.status(500).json({
      error:error
    })
  })
})

module.exports = router;