const bcrypt = require('bcrypt');
const saltRounds = 10;

async function checkPin (pin, returnedEmployeePin) {
  try {
    const match = await bcrypt.compare(pin, returnedEmployeePin.toString() )
    if(!match){
      return false
    } else {
      return true
    }
  } catch (error) {
    res.status(500).json({
      "message": error
    })
  }
}
async function hashPin (req) {
  return await bcrypt.hash(req.body.pin.toString(), saltRounds)
}

module.exports = {
  checkPin, 
  hashPin
}