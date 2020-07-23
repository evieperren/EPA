const { unauthorisedUsers } = require('../security/authorisation')

const roles = {
  FirstCateringLtd: (req, res, next) => {
    if(req.auth.user === 'first-catering'){
      next()
    } else {
      res.status(401).json({
        "message": unauthorisedUsers()
      })
    }
  },
  BowsFormulaOneAdmin: (req, res, next) => {
    if(req.auth.user === 'bows-formula-one'){
      next()
    } else {
      res.status(401).json({
        "message": unauthorisedUsers()
      })
    }
  },
  BowsFormulaOneEmployee: (req, res, next) => {
    if(req.auth.user === 'bows-formula-one-employee'){
      next()
    } else {
      res.status(401).json({
        "message": unauthorisedUsers()
      })
    }
  },
  FirstCateringLtd_BowsFormulaOne: (req, res, next) => {
    if(req.auth.user === 'first-catering' || req.auth.user === 'bows-formula-one'){
      next()
    } else {
      res.status(401).json({
        "message": unauthorisedUsers()
      })
    }
  },
  BowsFormulaOne: (req, res, next) => {
    if(req.auth.user === 'bows-formula-one-employee' || req.auth.user === 'bows-formula-one'){
      next()
    } else {
      res.status(401).json({
        "message": unauthorisedUsers()
      })
    }
  },
  all: (req, res, next) => {
    if(req.auth.user === 'first-catering' || req.auth.user === 'bows-formula-one' || req.auth.user === 'bows-formula-one-employee'){
      next()
    } else {
      res.status(401).json({
        "message": unauthorisedUsers()
      })
    }
  }
}

module.exports = roles