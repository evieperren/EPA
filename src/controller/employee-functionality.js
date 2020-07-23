const Employee = require('../model/employee')
const { checkPin, hashPin } = require('../encrypt/encrypt')
const { validationResult } = require('express-validator')
const winston = require('winston')
const { unauthorisedUsers } = require('../security/authorisation')

// GET ALL 
async function getAllEmployees (req, res){
  let returnedEmployees 
  try {
    // GET ALL WITH LOW BALANCE
    if(req.query.lowBalance){
      returnedEmployees = await Employee.find({accountBalance: {$lte: 2.00}})
      
      if(req.auth.user === 'first-catering'){
        winston.log('error', '401: Unauthorised access. Try again with correct details')
        res.status(401).json({
          "message": unauthorisedUsers()
        })
      } else {
          if(returnedEmployees.length === 0){
            winston.log('error', "404: No Employee's with balance lower than £2.00")
            res.status(404).json({
              "message": "No Employee's with balance lower than £2.00"
            })
          } else {
            winston.log('debug', "200: Successfully sent returned employees")
            res.status(200).json({
              "message": returnedEmployees
            })
          }
      }
    } else {
      returnedEmployees = await Employee.find()
    }
    if(returnedEmployees.length === 0){
      winston.log('error', "404: Unable to be found. Please register for an account")
      res.status(404).json({
        "message": "Unable to be found. Please register for an account"
      })
    } else {
      res.send(returnedEmployees)
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

    const errors = await validationResult(req)
    if(!errors.isEmpty()){
      winston.log('error', `400:${errors.array()}`)
      res.status(400).json({
        "message": errors.array()
      })

    } else {
      winston.log("debug", "201: Successfully created employee and sent")
      res.status(201).json({
        "message": "Created",
        "response": newEmployee
      })
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
let counter = 0;
async function getEmployeeByEmployeeID(req, res){
  try {
    const returnedEmployee = await Employee.findOne({employeeID: req.params.employeeID})
    if(returnedEmployee){
      if(req.auth.user === 'bows-formula-one-employee'){
        if(await checkPin(req.auth.password, returnedEmployee.pin)){
          returnedEmployee.visits.last = new Date()
          counter++

          if(counter >= 2){
            winston.log('debug',"Goodbye message sent")
            res.status(401).json({
              "message": 'Goodbye'
            })
          } else {
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
      } else {
        counter++
        returnedEmployee.visits.last = new Date()
        if(counter >= 2){
            winston.log('debug',"Goodbye message sent")
          res.status(401).json({
            "message": 'Goodbye'
          })
        } else {
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
      if(req.auth.user === 'bows-formula-one-employee'){
        if(await checkPin(req.auth.password, returnedEmployee.pin)){
          returnedEmployee.name.first = req.body.name.first || returnedEmployee.name.first
          returnedEmployee.name.last = req.body.name.last || returnedEmployee.name.last
          returnedEmployee.contactDetails.email = req.body.contactDetails.email || returnedEmployee.contactDetails.email
          returnedEmployee.contactDetails.telephone = req.body.contactDetails.telephone || returnedEmployee.contactDetails.telephone
          returnedEmployee.employeeID = req.body.employeeID || returnedEmployee.employeeID
          returnedEmployee.pin = await hashPin(req) || returnedEmployee.pin
          returnedEmployee.accountBalance = req.body.accountBalance || returnedEmployee.accountBalance
          returnedEmployee.visits.last = returnedEmployee.visits.current
          returnedEmployee.visits.current = new Date()

          counter++
          if(counter >= 2){
            winston.log('debug', "Goodbye message sent")
            res.json({
              "message": 'Goodbye'
            })
          } else {
            const errors = await validationResult(req)
            if(!errors.isEmpty()){
              winston.log('error', `400: ${errors.array()}`)
              res.status(400).json({
                "message": errors.array()
              })
            } else {
              returnedEmployee.save()
              winston.log('debug', "200: Successfully sent returned employee")
              res.status(200).json({
                "message": `Welcome, ${returnedEmployee.name.first}`,
                "response": returnedEmployee
              })
            }
          }
        } else {
          winston.log('error', '401: Unauthorised access. Try again with correct details')
          res.status(401).json({
            "message": unauthorisedUsers()
          })
        }
      } else {  
        returnedEmployee.name.first = req.body.name.first || returnedEmployee.name.first
        returnedEmployee.name.last = req.body.name.last || returnedEmployee.name.last
        returnedEmployee.contactDetails.email = req.body.contactDetails.email || returnedEmployee.contactDetails.email
        returnedEmployee.contactDetails.telephone = req.body.contactDetails.telephone || returnedEmployee.contactDetails.telephone
        returnedEmployee.employeeID = req.body.employeeID || returnedEmployee.employeeID
        returnedEmployee.pin = await hashPin(req) || returnedEmployee.pin
        returnedEmployee.accountBalance = req.body.accountBalance || returnedEmployee.accountBalance
        returnedEmployee.visits.last = returnedEmployee.visits.current
        returnedEmployee.visits.current =  new Date()
        
        counter++
        if(counter >= 2){
          winston.log('debug', "Goodbye message sent")
          res.json({
            "message": 'Goodbye'
          })
        } else {
          const errors = await validationResult(req)
          if(!errors.isEmpty()){
            res.status(400).json({
              "message": errors.array()
            })
          } else {
            returnedEmployee.save()
            winston.log('debug', "200: Successfully sent returned employee")
            res.status(200).json({
              "message": `Welcome, ${returnedEmployee.name.first}`,
              "response": returnedEmployee
            })
          }
        }
    }
    } else {
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
      if(req.auth.user === 'bows-formula-one-employee'){
        if(await checkPin(req.auth.password, returnedEmployee.pin)){
          await Employee.findOneAndDelete({employeeID: req.params.employeeID})
          winston.log('debug', "200: Successfully sent returned employee")
          res.status(200).json({
            "response": `Employee: ${returnedEmployee.employeeID} (${returnedEmployee.name.first} ${returnedEmployee.name.last}) has been successfully deleted`
          })
        } else {
          winston.log('error', '401: Unauthorised access. Try again with correct details')
          res.status(401).json({
            "message": unauthorisedUsers()
          })
        }
      } else {
        await Employee.findOneAndDelete({employeeID: req.params.employeeID})
        winston.log('debug', "200: Successfully sent returned employee")
        res.status(200).json({
          "response": `Employee: ${returnedEmployee.employeeID} (${returnedEmployee.name.first} ${returnedEmployee.name.last}) has been successfully deleted`
        })
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