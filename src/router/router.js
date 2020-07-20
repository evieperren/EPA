// const Router = require('express').Router

// const router = new Router()

// router.use((req, res, next) => {
//   console.log('Reached router page')
//   next()
// })

// router.use('/bow', require('../controller/employee'))

// module.exports = router


const express = require('express')
const Router = express.Router

const router = new Router()
router.use((req, res, next) => {
  console.log('I have reached routers page!')
  next()
})

router.use('/bow', require('../controller/employee'))

module.exports = router


