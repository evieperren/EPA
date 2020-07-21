const validation = {
  string: ((value) => {
    return /([A-Za-z]{2,30})\w+/.test(value)
  }),
  phone: ((value) => {
		return /^[0-9+]*$/.test(value);
  }),
  email: ((value) => {
    return /^[a-zA-z]{2,144}((.){1}[a-zA-Z]{2,144})?(@)[a-zA-Z]{2,144}(.){1}([a-zA-Z]{3})/.test(value)
  }),
  pin: ((value) => {
    return /([0-9]){4}/.test(value)
  })
}

module.exports = validation