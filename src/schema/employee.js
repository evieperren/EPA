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
      }
    },
    last: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 30,
      validate: {
        validator: validation.string
      }
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
  },
  pin: {
    type: String,
    required: true,
    validate: {
      validator: validation.pin
    }
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