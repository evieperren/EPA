const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
      trim: true
    },
    last: {
      type: String,
      required: true,
      trim: true
    }
  }
})

module.exports = EmployeeSchema