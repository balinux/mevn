const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/',(req,res,next) => {
  Order
    .find()
    .select("_id name email")
    .exec()
    .then(docs => {
    console.log(docs)
    const response = {
      count : docs.length,
      orders: docs.map(doc => {
        return {
          name:doc.name,
          email:doc.email,
          _id:doc._id,
          requres:{
            type: "GET",
            url:'http://localhost:3000/order/'+doc._id
          }
        }
      })
    }
    res.status(200).json(response);
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
    res.status(200).json({
        createdOrder : {
          name:result.name,
          email:result.email,
          _id:result._id,
          request:{
          type:'GET',
          url:'http://localhost:3000/order/'+result._id          
          }
        }
    })    
      }).catch(error => {
    console.log(error)
  })
  
  
  // res.status(200).json({
  //     message: "handle post Message",
  //     order:order
  // })
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
  const id = req.params.orderId;
  
  Order
    .findOneAndRemove({_id:id})
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

router.patch('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  const updateOps = {};
  
//   memilih salah satu data yang di update
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  
  Order
    .update({_id:id}, {$set:updateOps})
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