require('dotenv').config()
const basicAuth = require('express-basic-auth')
const winston = require('winston')

function authoriseUsers (username, password, cb) {
  if (basicAuth.safeCompare(username, 'bows-formula-one-employee')){
    cb(null, true)
    
  } else if (basicAuth.safeCompare(username, 'bows-formula-one') & basicAuth.safeCompare(password, process.env.BOWS_FORMULA_ONE_PASSWORD)){
    cb(null, true)

  } else if(basicAuth.safeCompare(username, 'first-catering') & basicAuth.safeCompare(password, process.env.FIRST_CATERING_PASSWORD)){
    cb(null, true)
  } 
  else {
    cb(null, false)
  }
}
function unauthorisedUsers () {
  winston.log('error', '401: Unauthorised access. Try again with correct details')
  return "Unauthorised access. Try again with correct details"
}
module.exports = {
  authoriseUsers,
  unauthorisedUsers
}