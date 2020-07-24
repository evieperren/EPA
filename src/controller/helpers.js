const Employee = require('../model/employee')
const winston = require('winston')

async function update (req, returnedEmployee) {
  returnedEmployee.name.first = req.body.name.first || returnedEmployee.name.first
  returnedEmployee.name.last = req.body.name.last || returnedEmployee.name.last
  returnedEmployee.contactDetails.email = req.body.contactDetails.email || returnedEmployee.contactDetails.email
  returnedEmployee.contactDetails.telephone = req.body.contactDetails.telephone || returnedEmployee.contactDetails.telephone
  returnedEmployee.employeeID = req.body.employeeID || returnedEmployee.employeeID
  returnedEmployee.pin = await hashPin(req) || returnedEmployee.pin
  returnedEmployee.accountBalance = req.body.accountBalance || returnedEmployee.accountBalance
  returnedEmployee.visits.last = returnedEmployee.visits.current
  returnedEmployee.visits.current = new Date()
}

function increaseCounter (res, counter) {
  if(counter >= 2){
    winston.log('debug', "Goodbye message sent")
    res.json({
      "message": 'Goodbye'
    })
    return true
  } else {
    return false
  }
}

async function findAndDelete (res, req, returnedEmployee) {
  await Employee.findOneAndDelete({employeeID: req.params.employeeID})
  winston.log('debug', "200: Successfully sent returned employee")
  res.status(200).json({
    "response": `Employee: ${returnedEmployee.employeeID} (${returnedEmployee.name.first} ${returnedEmployee.name.last}) has been successfully deleted`
  })
}

module.exports = {
  update,
  findAndDelete,
  increaseCounter 
}