const allowedOrigins = require('./allowedOrigins')

module.exports = {
  origin: (origin, cb) => {
    if (!allowedOrigins.indexOf(origin) != -1 || !origin)
      cb(null, true)
    else
      cb(new Error('origin not included'))
  },
  cerdentials: true,
  optionSuccessStatus: 200
}