const Employee = require('../model/employee')
const { checkPin, hashPin } = require('../encrypt/encrypt')
const winston = require('winston')
const { unauthorisedUsers } = require('../security/authorisation')
const {validation} = require('./validation')
const {update, findAndDelete, increaseCounter} = require('./helpers')
let counter = 0;

// GET ALL 
async function getAllEmployees (req, res){
  let returnedEmployees 
  try {
    // GET ALL WITH LOW BALANCE
    if(req.query.lowBalance){
      returnedEmployees = await Employee.find({accountBalance: {$lte: 2.00}}).sort('accountBalance')
      
      switch(req.auth.user){
        case 'first-catering':
          winston.log('error', '401: Unauthorised access. Try again with correct details')
          res.status(401).json({
            "message": unauthorisedUsers()
          })
          break
        default: 
        winston.log('debug', "200: Successfully sent returned employees")
        res.status(200).json({
          "message": returnedEmployees
        })
      }
    } else {
      returnedEmployees = await Employee.find()
      if(returnedEmployees.length === 0){
        winston.log('error', "404: Unable to be found. Please register for an account")
        res.status(404).json({
          "message": "Unable to be found. Please register for an account"
        })
      } else {
        res.status(200).json({
          "message": returnedEmployees
        })
      }
    }    
  } catch (error) {
    winston.log('error', `500: ${error}`)
    res.status(500).json({
      "message": error
    })
  }
}

// CREATE 
async function createEmployee (req, res){ 
  try {
    const newEmployee = new Employee({
      name: req.body.name,
      contactDetails: req.body.contactDetails,
      employeeID: req.body.employeeID,
      pin: await hashPin(req),
      accountBalance: req.body.accountBalance,
      visits: {
        current: new Date(),
        last: new Date(),
      }
    })

  if(await validation.check(req, res, newEmployee)){
    newEmployee.save()
  }

  } catch (error) {
    winston.log('error', `500: ${error}`)
    res.status(500).json({
      "message": error
    })
  }
}

// GET BY EMPLOYEE ID
async function getEmployeeByEmployeeID(req, res){
  try {
    const returnedEmployee = await Employee.findOne({employeeID: req.params.employeeID})
    if(returnedEmployee){
      switch(req.auth.user){
        case 'bows-formula-one-employee':
          if(await checkPin(req.auth.password, returnedEmployee.pin)){
            returnedEmployee.visits.last = new Date()
            counter++
    
           if(!increaseCounter(res, counter)){
            winston.log('debug', "200: Successfully sent returned employee")
            res.status(200).json({
              "message": `Welcome, ${returnedEmployee.name.first}`,
              "employee": returnedEmployee
            })
           }
          } else {
            winston.log('error', '401: Unauthorised access. Try again with correct details')
            res.status(401).json({
              "message": unauthorisedUsers()
            })
          }
        break 
        default: 
          counter++
          returnedEmployee.visits.last = new Date()
          if(!increaseCounter(res, counter)){
            winston.log('debug',"200: Successfully sent returned employee")
            res.status(200).json({
              "message": `Welcome, ${returnedEmployee.name.first}`,
              "employee": returnedEmployee
            })
          }
      }
    } else {
      winston.log('error', "404: Unable to be found. Please register for an account")
      res.status(404).json({
        "message": "Unable to be found. Please register for an account"
      })
    }
  } catch (error){
    winston.log('error', `500: ${error}`)
    res.status(500).json({
      "message": error
    })
  }
}

// UPDATE 
async function updateEmployee (req, res){
  try {
    const returnedEmployee = await Employee.findOne({employeeID: req.params.employeeID})
    if(returnedEmployee){
      switch (req.auth.user){
        case 'bows-formula-one-employee': 
          if(await checkPin(req.auth.password, returnedEmployee.pin)){
            update(req, returnedEmployee)
            counter++ 
            if(!increaseCounter(res, counter)){
              if(await validation.check(req, res, returnedEmployee)){
                returnedEmployee.save()
              }
            }
          }
        break
        default: 
          update(req, returnedEmployee)
          counter++
          if(!increaseCounter(res, counter)){
            if(await validation.check(req, res, returnedEmployee)){
              returnedEmployee.save()
            }
          }
      }
    }
    else {
      winston.log('error', "404: Unable to be found. Please register for an account")
      res.status(404).json({
        "message": "Unable to be found. Please register for an account"
      })
    
    }
  } catch(error){
    winston.log('error', `500: ${error}`)
    res.status(500).json({
      "message": error
    })
  }
}

// DELETE
async function deleteEmployee (req, res){
  try {
    const returnedEmployee = await Employee.findOne({employeeID: req.params.employeeID})

    if(returnedEmployee){
      switch (req.auth.user){
        case 'bows-formula-one-employee':
          if(await checkPin(req.auth.password, returnedEmployee.pin)){
            findAndDelete(res, req, returnedEmployee) 
          } else {
            winston.log('error', '401: Unauthorised access. Try again with correct details')
            res.status(401).json({
              "message": unauthorisedUsers()
            })
          }
          break
        default: 
          findAndDelete(res, req, returnedEmployee)
      }
    } else {
      winston.log('error', "404: Unable to be found. Please register for an account")
      res.status(404).json({
        "message": "Unable to be found. Please register for an account"
      })
    }
  } catch (error){
    winston.log('error', `500: ${error}`)
    res.status(500).json({
      "message": error
    })
  }
}

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeByEmployeeID,
  deleteEmployee,
  updateEmployee
}