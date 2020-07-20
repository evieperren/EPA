const mongoose = require('mongoose')
const EmployeeSchema = require('../schema/employee')

const Employee = mongoose.model('Bow-Formula-one-employees', EmployeeSchema)

module.exports = Employee