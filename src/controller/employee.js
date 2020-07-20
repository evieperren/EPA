const mongoose = require('mongoose')
const express = require('express')
const Router = express.Router

const controller = new Router()

controller.use('/', (req, res, next) => {
  console.log('Reached controller')
  next()
})

controller.get('/', (req, res, next) => {
  console.log('yay i am working here!')
})
module.exports = controller