`use strict`

const bcrypt = require('bcryptjs')
const {bookshelf, knex} = require('../db/database')
const localAuth = require('../auth/local')

require('./game')
require('./userGame')

const Auth = bookshelf.Model.extend({
  tableName: 'users',
  // sets relationship with games
  games: function () { return this.belongsToMany('Game').through('UserGame')},
  // sets relationship with friends
  friends: function () { return this.belongsToMany('Friend').through('UserFriend')}
}, {
  // method for registering new user
  createUser: (req, res, next) => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(req.body.password, salt)
    return knex('users')
    .insert({
      username: req.body.username,
      password: hash
    })
    .returning('*')
  },

  // method for getting a user
  getUser: (username) => {
    return knex('users').where({username}).first()
  },

  // method for comparing passwords
  comparePass: (userPassword, databasePassword) => {
    const bool = bcrypt.compareSync(userPassword, databasePassword)
    if (!bool) throw new Error('password does not match')
    else return true
  },

  // method to make sure user is authenticated
  ensureAuthenticated: (req, res, next) => {
    // checks to see if logged in
    if (!(req.headers && req.headers.authorization)) {
      return res.status(400).json({
        status: 'Please log in'
      })
    }
    // decode the token
    let header = req.headers.authorization.split(' ')
    console.log('header in ensureAuthenticated', header)
    let token = header[1]
    localAuth.decodeToken(token, (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 'Token has expired'
        })
      } else {
        // check if the user still exists in the db
        return knex('users').where({id: parseInt(payload.sub)}).first()
        .then((user) => {
          next()
        })
        .catch((err) => {
          console.log('err from ensureAuthenticated catch', err)
          res.status(500).json({
            status: 'error'
          })
        })
      }
    })
  }

})

module.exports = bookshelf.model('Auth', Auth)
