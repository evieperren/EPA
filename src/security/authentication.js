const roles = {
  FirstCateringLtd: (req, res, next) => {
    if(req.auth.user === 'first-catering'){
      next()
    } else {
      res.status(401).json({
        "message": "Unauthorised access. Try again with correct details"
      })
    }
  },
  BowsFormulaOneAdmin: (req, res, next) => {
    if(req.auth.user === 'bows-formula-one'){
      next()
    } else {
      res.status(401).json({
        "message": "Unauthorised access. Try again with correct details"
      })
    }
  },
  BowsFormulaOneEmployee: (req, res, next) => {
    if(req.auth.user === 'bows-formula-one-employee'){
      next()
    } else {
      res.status(401).json({
        "message": "Unauthorised access. Try again with correct details"
      })
    }
  },
  FirstCateringLtd_BowsFormulaOne: (req, res, next) => {
    if(req.auth.user === 'first-catering' || req.auth.user === 'bows-formula-one'){
      next()
    } else {
      res.status(401).json({
        "message": "Unauthorised access. Try again with correct details"
      })
    }
  },
  BowsFormulaOne: (req, res, next) => {
    if(req.auth.user === 'bows-formula-one-employee' || req.auth.user === 'bows-formula-one'){
      next()
    } else {
      res.status(401).json({
        "message": "Unauthorised access. Try again with correct details"
      })
    }
  },
  all: (req, res, next) => {
    if(req.auth.user === 'first-catering' || req.auth.user === 'bows-formula-one' || req.auth.user === 'bows-formula-one-employee'){
      next()
    } else {
      res.status(401).json({
        "message": "Unauthorised access. Try again with correct details"
      })
    }
  }
}

module.exports = roles