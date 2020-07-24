const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const basicAuth = require('express-basic-auth')
const { authoriseUsers, unauthorisedUsers } = require('./security/authorisation')
const winston = require('winston')
const format = winston.format
const { combine, timestamp, prettyPrint } = format;

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(basicAuth({ 
  authorizer: authoriseUsers,
  authorizeAsync: true,
  unauthorizedResponse: unauthorisedUsers,
  challenge: true
}))

winston.configure({
  transports: [
    new winston.transports.File({ 
      level: 'error', 
      filename: './logs/errors.log' 
    }), 
    new winston.transports.File({ 
      level: 'debug',
      filename: './logs/debug.log',
    })
  ],
  format: combine(
    timestamp(),
    prettyPrint()
  )
});

module.exports = app