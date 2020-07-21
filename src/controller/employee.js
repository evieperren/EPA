const express = require('express')
const Router = express.Router
const { createEmployee, getAllEmployees, getEmployeeByEmployeeID, deleteEmployee } = require('./employee-functionality')

const controller = new Router()

controller.use('/', (req, res, next) => {
  console.log('Reached controller')
  next()
})

controller.get('/', (req, res, next) => {
  getAllEmployees(req, res)
})
controller.get('/:employeeID', (req, res, next) => {
  getEmployeeByEmployeeID(req, res)

})
controller.post('/', (req, res) => {
  createEmployee(req, res)
})
controller.delete('/:employeeID', (req, res, next) => {
  deleteEmployee(req, res)

})

module.exports = controller