const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 30
    },
    last: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 30
    }
  },
  contactDetails: {
    telephone: {
      type: String,
      required: true,
      minLength: 9,
      maxLength: 11
    },
    email: {
      type: String,
      required: true
    }
  },
  employeeID: {
    type: String,
    required: true,
    minLength: 16,
  },
  pin: {
    type: Number,
    required: true,
  },
  accountBalance: {
    type: Number,
    required: true
  },
  visits: {
    last: {
      type: Date,
      required: true
    }
  }
})

module.exports = EmployeeSchema