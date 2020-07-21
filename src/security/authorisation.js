const basicAuth = require('express-basic-auth')

function authoriseUsers (username, password, cb) {
  if (basicAuth.safeCompare(username, 'bows-formula-one-employee')){
    cb(null, true)
    
  } else if (basicAuth.safeCompare(username, 'bows-formula-one') & basicAuth.safeCompare(password, 'B0wsFo7Mu1a&n3')){
    cb(null, true)

  } else if(basicAuth.safeCompare(username, 'first-catering') & basicAuth.safeCompare(password, 'f17sTc@t3r1nG')){
    cb(null, true)
  } 
  else {
    cb(null, false)
  }
}
function unauthorisedUsers () {
  return "Unauthorised access. Try again with correct details"
}
module.exports = {
  authoriseUsers,
  unauthorisedUsers
}