const express = require('express')
const Router = express.Router
const { createEmployee, getAllEmployees } = require('./employee-functionality')

const controller = new Router()

controller.use('/', (req, res, next) => {
  console.log('Reached controller')
  next()
})

controller.get('/', (req, res, next) => {
  getAllEmployees(req, res)
})

controller.post('/', (req, res) => {
  createEmployee(req, res)
})
module.exports = controller