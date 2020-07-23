const express = require('express')
const Router = express.Router
const { createEmployee, getAllEmployees, getEmployeeByEmployeeID, deleteEmployee, updateEmployee } = require('./employee-functionality')
const roles = require('../security/authentication')
const { validation }= require('./validation')
const { unauthorisedUsers } = require('../security/authorisation')
const winston  = require('winston')

const controller = new Router()

controller.use('/', (req, res, next) => {
  winston.log('debug', 'Reached controller')
  console.log('Reached controller')
  // req.session.cookie.expires = new Date(Date.now() + 15000)
  
  setTimeout(() => {
    req.session = null
    return unauthorisedUsers()
  }, 5000)
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