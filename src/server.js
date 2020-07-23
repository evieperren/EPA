const mongoose = require('mongoose')
const app = require('./index')
const server = require('./index')

mongoose.connect('mongodb://localhost:4300/first-catering', {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
.then(() => {
  console.log('Successfully connected to database')
  const setup = server.listen(4301, () => console.log(`Listerning on port: 4301`))
  app.use('/api/v1', require('./router/router'))
  
  setTimeout(() => {
    console.log('Session has ended')
    setup.close()
  }, 180000)
})
.catch((error) => {
  console.log(`The error is ${error} `)
})