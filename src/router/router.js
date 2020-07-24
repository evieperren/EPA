const express = require('express')
const Router = express.Router
const winston = require('winston')
const router = new Router()

router.use((req, res, next) => {
  winston.log('debug', 'reached routers pages')
  next()
})

router.use('/bows-formula-one', require('../controller/employee'))

module.exports = router


