const Employee = require('../model/employee')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// GET ALL 
async function getAllEmployees (req, res){
  let returnedEmployees 
  try {
    // GET ALL WITH LOW BALANCE
    if(req.query.lowBalance){
      returnedEmployees = await Employee.find({accountBalance: {$lte: 2.00}})
      if(returnedEmployees.length === 0){
        res.status(404).json({
          "message": "No Employee's with balance lower than £2.00"
        })
      }
    } else {
      returnedEmployees = await Employee.find()
    }
    if(returnedEmployees.length === 0){
      res.status(404).json({
        "message": "Unable to be found. Please register for an account"
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
    const hashed = await bcrypt.hash(req.body.pin.toString(), saltRounds)
    const newEmployee = new Employee({
      name: req.body.name,
      contactDetails: req.body.contactDetails,
      employeeID: req.body.employeeID,
      pin: hashed,
      accountBalance: req.body.accountBalance,
      visits: {
        last: new Date()
      }
    })

    res.send(newEmployee)
    newEmployee.save()

  } catch (error) {
    console.log(error)
  }
}

// GET BY EMPLOYEE ID
async function getEmployeeByEmployeeID(req, res){
  try {
    const returnedEmployee = await Employee.findOne({employeeID: req.params.employeeID})
    if(returnedEmployee){
      if(await checkPin(req.query.pin, returnedEmployee.pin)){
        res.status(200).json({
          "message": `Welcome, ${returnedEmployee.name.first}`,
          "employee": returnedEmployee
        })
      } else {
        res.status(401).json({
          "message": "Unauthorised access. Try again with correct details"
        })
      }
    } else {
      res.status(404).json({
        "message": "Unable to be found. Please register for an account"
      })
    }
  } catch (error){
    console.log(error)
  }
}


async function checkPin (pin, returnedEmployeePin) {
  try {
    const match = await bcrypt.compare(pin, returnedEmployeePin.toString() )
    if(!match){
      return false
    } else {
      return true
    }
  } catch (error) {
      console.log(error)
  }
}

// UPDATE 

// DELETE
async function deleteEmployee (req, res){
  try {
    const returnedEmployee = await Employee.findOne({employeeID: req.params.employeeID})

    if(returnedEmployee){
      if(await checkPin(req.query.pin, returnedEmployee.pin)){
        returnedEmployee.deleteOne()
        res.status(200).json({
          "response": `Employee: ${returnedEmployee.employeeID} (${returnedEmployee.name.first} ${returnedEmployee.name.last}) has been successfully deleted`
        })
      } else {
        res.status(401).json({
          "message": "Unauthorised access. Try again with correct details"
        })
      }
    } else {
      res.status(404).json({
        "message": "Unable to be found. Please register for an account"
      })
    }
  } catch (error){
    res.status(500).json({
      "message": error
    })
  }
}
module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeByEmployeeID,
  deleteEmployee
}