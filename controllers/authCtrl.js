`use strict`

const Auth = require('../models/auth')
const userGame = require('../models/userGame')
const localAuth = require('../auth/local')

module.exports.getUserGames = ({query: {userId}}, res, next) => {
  Auth.forge({id: userId})
  .fetch({withRelated: ['games'], require: true})
  .then((usergames) => {
    res.status(200).json(usergames)
  })
  .catch((err) => {
    next(err)
  })
}

module.exports.register = (req, res, next) => {
  Auth.createUser(req)
  .then((user) => { return localAuth.encodeToken(user[0]) })
  .then((token) => {
    res.status(200).json({
      status: 'success',
      token: token
    })
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error'
    })
  })
}

module.exports.login = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  Auth.getUser(username)
  .then((response) => {
    Auth.comparePass(password, response.password)
    return response
  })
  .then((response) => { return localAuth.encodeToken(response) })
  .then((token) => {
    res.status(200).json({
      status: 'success',
      token: token
    })
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error'
    })
  })
}

module.exports.makeSureAuthenticated = (req, res, next) => {
  Auth.ensureAuthenticated(req, res, next)
  .then((res) => {
    res.status(200).json({
      status: 'success',
    })
  })
}
