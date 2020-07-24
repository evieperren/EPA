const { check } = require("express-validator")
const { validationResult } = require('express-validator')
const winston = require('winston')

const validation = {
  post: [
    check('name.first')
      .isString().withMessage('Please enter a valid first name')
      .isLength({min: 2, max: 30}).withMessage('Please enter a name between 2 and 30 characters')
      .matches(/([A-Za-z]{2,30})\w+/).withMessage('Please enter a valid first name')
      .trim()
      .isUppercase()
      .not().isEmpty(),
    check('name.last')
      .isString().withMessage('Please enter a valid last name')
      .isLength({min: 2, max: 30}).withMessage('Please enter a name between 2 and 30 characters')
      .matches(/([A-Za-z]{2,30})\w+/).withMessage('Please enter a valid last name')
      .trim()
      .isUppercase()
      .not().isEmpty(),
    check('contactDetails.telephone')
      .isString()
      .isLength({min: 9, max: 11}).withMessage('Please enter a telephone number between 2 and 30 characters')
      .matches(/([0-9]{9,11})\w+/).withMessage('Please enter a valid telephone')
      .trim()
      .not().isEmpty(),
    check('contactDetails.email')
      .isEmail().withMessage('Please enter a valid email')
      .normalizeEmail({all_lowercase: true})
      .trim()
      .not().isEmpty(),
    check('employeeID')
      .isString().withMessage('Please enter a valid employee ID')
      .isLength({min: 16}).withMessage('Please enter a valid employee ID')
      .trim(),
    check('pin')
      .isNumeric().withMessage('Please enter a valid pin code of 4 digits')
      .trim()
      .not().isEmpty(),
    check('accountBalance')
      .isCurrency({require_symbol: false, allow_negatives: true, negative_sign_before_digits: true, negative_sign_after_digits: true, decimal_separator: '.', allow_decimal: true})
      .not().isEmpty(),
    check('visits.current')
      .isISO8601().withMessage('Please enter a valid date')
      .not().isEmpty(),
    check('visits.last')
      .isISO8601().withMessage('Please enter a valid date')
      .not().isEmpty()
  ],
  put: [
    check('name.first')
      .isString().withMessage('Please enter a valid first name')
      .isLength({min: 2, max: 30}).withMessage('Please enter a name between 2 and 30 characters')
      .matches(/([A-Za-z]{2,30})\w+/).withMessage('Please enter a valid first name')
      .trim()
      .isUppercase()
      .optional({checkFalsy: true}),
    check('name.last')
      .isString().withMessage('Please enter a valid last name')
      .isLength({min: 2, max: 30}).withMessage('Please enter a name between 2 and 30 characters')
      .matches(/([A-Za-z]{2,30})\w+/).withMessage('Please enter a valid last name')
      .trim()
      .isUppercase()
      .optional({checkFalsy: true}),
    check('contactDetails.telephone')
      .isString()
      .isLength({min: 9, max: 11}).withMessage('Please enter a telephone number between 2 and 30 characters')
      .matches(/([0-9]{9,11})\w+/).withMessage('Please enter a valid telephone')
      .trim()
      .optional({checkFalsy: true}),
    check('contactDetails.email')
      .isEmail().withMessage('Please enter a valid email')
      .normalizeEmail({all_lowercase: true})
      .trim()
      .optional({checkFalsy: true}),
    check('employeeID')
      .isString().withMessage('Please enter a valid employee ID')
      .isLength({min: 16}).withMessage('Please enter a valid employee ID')
      .trim()
      .optional({checkFalsy: true}),
    check('pin')
      .isNumeric().withMessage('Please enter a valid pin code of 4 digits')
      .trim()
      .optional({checkFalsy: true}),
    check('accountBalance')
      .isCurrency({require_symbol: false, allow_negatives: true, negative_sign_before_digits: true, negative_sign_after_digits: true, decimal_separator: '.', allow_decimal: true})
      .optional({checkFalsy: true}),
    check('visits.current')
      .isISO8601().withMessage('Please enter a valid date')
      .not().isEmpty(),
    check('visits.last')
      .isISO8601().withMessage('Please enter a valid date')
      .not().isEmpty()
  ],
  check: async (req, res, employee) => {
      const errors = await validationResult(req)
      if(!errors.isEmpty()){
        winston.log('error', `400:${errors.array()}`)
        res.status(400).json({
          "message": errors.array()
        })
        return false
    
      } else {
        winston.log("debug", "201: Successfully created employee and sent")
        res.status(201).json({
          "message": "Created",
          "response": employee
        })
        return true
      }
    }
}

module.exports = { validation }