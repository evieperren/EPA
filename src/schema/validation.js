const validation = {
  string: ((value) => {
    return /([A-Za-z]{2,30})\w+/.test(value)
  }),
  phone: ((value) => {
		return /([0-9]{9,11})\w+/.test(value);
  }),
  email: ((value) => {
    return /^[a-zA-z]{2,144}((.){1}[a-zA-Z]{2,144})?(@)[a-zA-Z]{2,144}(.){1}([a-zA-Z]{3})/.test(value)
  }),
}

module.exports = validation