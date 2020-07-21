const { check } = require("express-validator")

const validation = {
  post: [
    check('name.first')
      .isString().withMessage('Please enter a valid first name')
      .length({min: 2, max: 30}).withMessage('Please enter a name between 2 and 30 characters')
      .matches(/([A-Za-z]{2,30})\w+/).withMessage('Please enter a valid first name')
      .trim()
      .isUppercase(),
    check('name.last')
      .isString().withMessage('Please enter a valid last name')
      .length({min: 2, max: 30}).withMessage('Please enter a name between 2 and 30 characters')
      .matches(/([A-Za-z]{2,30})\w+/).withMessage('Please enter a valid last name')
      .trim()
      .isUppercase(),
    check('contactDetails.telephone')
      .isString()
      .length({min: 9, max: 11}).withMessage('Please enter a telephone number between 2 and 30 characters')
      .matches(/([0-9]{9,11})\w+/).withMessage('Please enter a valid telephone')
      .trim(),
    check('contactDetails.email')
      .isEmail().withMessage('Please enter a valid email')
      .normalizeEmail({all_lowercase: true})
      .matches(/^[a-zA-z]{2,144}((.){1}[a-zA-Z]{2,144})?(@)[a-zA-Z]{2,144}(.){1}([a-zA-Z]{3})/).withMessage('Please enter a valid email')
      .trim(),
    check('employeeID')
      .isString().withMessage('Please enter a valid employee ID')
      .length({min: 16}).withMessage('Please enter a valid employee ID')
      .trim(),
    check('pin')
      .isString().withMessage('Please enter a valid pin code of 4 digits')
      .trim(),
    check('accountBalance')
      .isCurrency({require_symbol: false, allow_negatives: true, negative_sign_before_digits: true, negative_sign_after_digits: true, decimal_separator: '.', allow_decimal: true, require_decimal: true, digits_after_decimal: [2]}).withMessage('Please enter a value with 2 decimal places'),
    check('visits.current')
      .isISO8601().withMessage('Please enter a valid date'),
    check('visits.last')
      .isISO8601().withMessage('Please enter a valid date')
  ],
  put: [

  ]
}

module.exports = validation