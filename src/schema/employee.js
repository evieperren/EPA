const mongoose = require('mongoose')
const validation = require('./validation')

const EmployeeSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 30,
      validate: {
        validator: validation.string
      },
      uppercase: true
    },
    last: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 30,
      validate: {
        validator: validation.string
      },
      uppercase: true
    }
  },
  contactDetails: {
    telephone: {
      type: String,
      required: true,
      minLength: 9,
      maxLength: 11,
      validate: {
        validator: validation.phone
      }
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validation.email
      }
    }
  },
  employeeID: {
    type: String,
    required: true,
    minLength: 16,
    unique: true
  },
  pin: {
    type: String,
    required: true,
    unique: true
  },
  accountBalance: {
    type: Number,
    required: true
  },
  visits: {
    current: {
      type: Date,
      required: true
    },
    last: {
      type: Date,
      required: true
    }
  }
})

module.exports = EmployeeSchema