`use strict`

// requirements and variable declarations
const Auth = require('../models/auth')
const localAuth = require('../auth/local')
const {knex} = require('../db/database')
const Friend = require('../models/friend')

// gets games for a specified user
module.exports.getUserGames = (req, res, next) => {
  // breaks headers into an array
  let header = req.headers.authorization.split(' ')
  // gets token from header array
  let token = header[1]
  // decodes token and gets user id
  localAuth.decodeToken(token, (err, payload) => {
    return knex('users').where({id: parseInt(payload.sub)}).first()
    .then((user) => {
      const id = user.id
      Auth.forge({id})
      //gets user info and games
      .fetch({withRelated: ['games'], require: true})
      .then((usergames) => {
        res.status(200).json(usergames)
      })
      .catch((err) => {
        next(err)
      })
    })
  })
}

// gets friends that a user has unlocked
module.exports.getUserFriends = (req, res, next) => {
  let header = req.headers.authorization.split(' ')
  let token = header[1]
  localAuth.decodeToken(token, (err, payload) => {
    return knex('users').where({id: parseInt(payload.sub)}).first()
    .then((user) => {
      const id = user.id
      Auth.forge({id})
      .fetch({withRelated: ['friends'], require: true})
      .then((userfriends) => {
        res.status(200).json(userfriends)
      })
      .catch((err) => {
        next(err)
      })
    })
  })
}

// registers a new user and returns a token
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

// logs in a user and sends a token
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

// sends success response if user is authenticated (called from Auth model)
module.exports.makeSureAuthenticated = (req, res, next) => {
  res.status(200).json({
    status: 'success',
  })
}
