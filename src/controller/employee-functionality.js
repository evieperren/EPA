const mongoose = require('mongoose')
const Employee = require('../model/employee')

// GET ALL 
async function getAllEmployees (req, res){
  let returnedEmployees 
  try {
    // GET ALL WITH LOW BALANCE
    if(req.query.lowBalance){
      returnedEmployees = await Employee.find({accountBalance: {$lte: 2.00}})
    } else {
      returnedEmployees = await Employee.find()
    }
    
    if(returnedEmployees.length === 0){
      res.status(404).json({
        "message": "No employees are registered"
      })
    } else {
      res.send(returnedEmployees)

    }


  } catch (error) {
    console.log(error)
    res.status(401).json({
      "message": "unauthorised access"
    })
    res.status(500).json({
      "message": "Internal server error"
    })
  }
}


// CREATE 
async function createEmployee (req, res){
  try {
    const newEmployee = new Employee(req.body)
    newEmployee.save()
    res.send(newEmployee)

  } catch (error) {
    console.log(error)
  }
}

// GET BY EMPLOYEE ID

// UPDATE 

// DELETE

module.exports = {
  getAllEmployees,
  createEmployee
}