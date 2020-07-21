const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
let hashed = ''
bcrypt.hash(myPlaintextPassword, saltRounds).then((hash) => {
  hashed = hash
  console.log(hashed)
})
bcrypt.compare(myPlaintextPassword, hashed).then((result) => {
  console.log(result)
})

async function checkPin (pin) {
  const 
  const match = await bcrypt.compare(pin, )
}