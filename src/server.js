const mongoose = require('mongoose')
const app = require('./index')
const server = require('./index')

mongoose.connect('mongodb://localhost:4300/first-catering', {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Successfully connected to database')
  server.listen(4301, () => console.log(`Listerning on port: 4301`))
  app.use('/api/v1', require('./router/router'))
})
.catch((error) => {
  console.log(` the error is ${error} `)
})