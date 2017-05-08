`use strict`

const bcrypt = require('bcryptjs');
const {bookshelf, knex} = require('../db/database')

const Auth = bookshelf.Model.extend({
  tableName: 'users'
}, {
    createUser: (req, res, next) => {
      console.log('in auth model')
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.password, salt);
      return knex('users')
      .insert({
        username: req.body.username,
        password: hash
      })
      .returning('*');
    }
})

module.exports = bookshelf.model('Auth', Auth)
