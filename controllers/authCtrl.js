`use strict`

const Auth = require('../models/auth')

// Registers new user
// responds with status code 200 if successful
module.exports.register = (req, res, next) => {
  Auth.createUser()
    .then(user => res.status(200).json({user}))
    .catch(error => next(error))
}
