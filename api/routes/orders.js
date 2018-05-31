const express = require('express');
const router =  express.Router();

router.get('/',(req,res,next) => {
  res.status(200).json({
      message: "handle get Message"
  })
})

router.post('/',(req,res,next) => {
  res.status(200).json({
      message: "handle post Message"
  })
})

module.exports = router;