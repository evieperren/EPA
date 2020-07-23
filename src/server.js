const mongoose = require('mongoose')
const app = require('./index')
const server = require('./index')
const winston = require('winston')

mongoose.connect('mongodb://localhost:4300/first-catering', {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
.then(() => {
  console.log('Successfully connected to database')
  server.listen(4301, () => console.log(`Listerning on port: 4301`))
  app.use('/api/v1', require('./router/router'))
})
.catch((error) => {
  console.log(`The error is ${error} `)
})