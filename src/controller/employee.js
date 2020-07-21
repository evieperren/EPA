const express = require('express')
const Router = express.Router
const { createEmployee, getAllEmployees, getEmployeeByEmployeeID, deleteEmployee, updateEmployee } = require('./employee-functionality')
const roles = require('../security/authentication')

const controller = new Router()

controller.use('/', (req, res, next) => {
  console.log('Reached controller')
  next()
})
controller.get('/', roles.FirstCateringLtd_BowsFormulaOne, (req, res) => {
  getAllEmployees(req, res)
})
controller.get('/:employeeID', roles.BowsFormulaOneEmployee, (req, res) => {
  getEmployeeByEmployeeID(req, res)
})
controller.post('/', (req, res) => {
  createEmployee(req, res)
})
controller.delete('/:employeeID', (req, res) => {
  deleteEmployee(req, res)
})
controller.put('/:employeeID', (req, res) => {
  updateEmployee(req, res)
})

module.exports = controller