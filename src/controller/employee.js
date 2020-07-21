const express = require('express')
const Router = express.Router
const { createEmployee, getAllEmployees, getEmployeeByEmployeeID, deleteEmployee, updateEmployee } = require('./employee-functionality')
const roles = require('../security/authentication')
const validation = require('./validation')

const controller = new Router()

controller.use('/', (req, res, next) => {
  console.log('Reached controller')
  next()
})
controller.get('/', roles.FirstCateringLtd_BowsFormulaOne, (req, res) => {
  getAllEmployees(req, res)
})
controller.get('/:employeeID', roles.all, (req, res) => {
  getEmployeeByEmployeeID(req, res)
})
controller.post('/', roles.all, validation.post, (req, res) => {
  createEmployee(req, res)
})
controller.put('/:employeeID', roles.BowsFormulaOne, validation.put, (req, res) => {
  updateEmployee(req, res)
})
controller.delete('/:employeeID', roles.BowsFormulaOne, (req, res) => {
  deleteEmployee(req, res)
})

module.exports = controller