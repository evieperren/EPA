const express = require('express')
const Router = express.Router

const router = new Router()
router.use((req, res, next) => {
  console.log('Reached routers page')
  next()
})

router.use('/bow-formula-one', require('../controller/employee'))

module.exports = router


