const roles = {
  FirstCateringLtd: (req, res, next) => {
    if(req.auth.user === 'first-catering'){
      next()
    } else {
      res.status(401).json({
        "message": "Restricted access. Please check your permissions"
      })
    }
  },
  BowsFormulaOneAdmin: (req, res, next) => {
    if(req.auth.user === 'bows-formula-one'){
      next()
    } else {
      res.status(401).json({
        "message": "Restricted access. Please check your permissions"
      })
    }
  },
  BowsFormulaOneEmployee: (req, res, next) => {
    if(req.auth.user === 'bows-formula-one-employee'){
      next()
    } else {
      res.status(401).json({
        "message": "Restricted access. Please check your permissions"
      })
    }
  },
  FirstCateringLtd_BowsFormulaOne: (req, res, next) => {
    if(req.auth.user === 'first-catering' || req.auth.user === 'bows-formula-one'){
      next()
    } else {
      res.status(401).json({
        "message": "Restricted access. Please check your permissions"
      })
    }
  },
  BowsFormulaOne: () => {
    if(req.auth.user === 'bows-formula-one-employee' || req.auth.user === 'bows-formula-one'){
      next()
    } else {
      res.status(401).json({
        "message": "Restricted access. Please check your permissions"
      })
    }
  },
  all: () => {
    if(req.auth.user === 'first-catering' || req.auth.user === 'bows-formula-one' || req.auth.user === 'bows-formula-one-employee'){
      next()
    } else {
      res.status(401).json({
        "message": "Restricted access. Please check your permissions"
      })
    }
  }
}

module.exports = roles