const Employee = require('../model/employee')
const { checkPin, hashPin} = require('../encrypt/encrypt')

// GET ALL 
async function getAllEmployees (req, res){
  let returnedEmployees 
  try {
    // GET ALL WITH LOW BALANCE
    if(req.query.lowBalance){
      returnedEmployees = await Employee.find({accountBalance: {$lte: 2.00}})
      
      if(req.auth.user === 'first-catering'){
        res.status(401).json({
          "message": "Unauthorised access. Try again with correct details"
        })
      } else {
          if(returnedEmployees.length === 0){
            res.status(404).json({
              "message": "No Employee's with balance lower than £2.00"
            })
          } else {
            res.send(returnedEmployees)
          }
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

    
    res.send(newEmployee)
    newEmployee.save()

  } catch (error) {
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
      if(req.auth.user === 'bows-formula-one-employee'){
        if(await checkPin(req.auth.password, returnedEmployee.pin)){
          returnedEmployee.visits.last = new Date()
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
        returnedEmployee.visits.last = new Date()
        res.status(200).json({
          "message": `Welcome, ${returnedEmployee.name.first}`,
          "employee": returnedEmployee
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
          returnedEmployee.save()

          res.status(200).json({
            "message": `Welcome, ${returnedEmployee.name.first}`,
            "response": returnedEmployee
          })
        } else {
          res.status(401).json({
            "message": "Unauthorised access. Try again with correct details"
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
        
        returnedEmployee.save()
        res.status(200).json({
          "message": `Welcome, ${returnedEmployee.name.first}`,
          "response": returnedEmployee
        })
      }
    } else {
      // this is not working 
      res.status(404).json({
        "message": "Unable to be found. Please register for an account"
      })
    }
  } catch(error){
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
      if(req.auth.user === 'bow-formula-one-employee'){
        if(await checkPin(req.auth.password, returnedEmployee.pin)){
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
        res.status(200).json({
          "response": `Employee: ${returnedEmployee.employeeID} (${returnedEmployee.name.first} ${returnedEmployee.name.last}) has been successfully deleted`
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
  deleteEmployee,
  updateEmployee
}