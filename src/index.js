const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const basicAuth = require('express-basic-auth')
const session = require('express-session');
const { authoriseUsers, unauthorisedUsers } = require('./security/authorisation')

const app = express()

app.use(cors())
app.use(session({secret: '1234', saveUninitialized: true,resave: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(basicAuth({ 
  authorizer: authoriseUsers,
  authorizeAsync: true,
  unauthorizedResponse: unauthorisedUsers,
  challenge: true
}))

module.exports = app