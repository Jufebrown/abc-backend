`use strict`

const bcrypt = require('bcryptjs');
const {bookshelf, knex} = require('../db/database')

const Auth = bookshelf.Model.extend({
  tableName: 'users'
}, {
  // method for registering new user
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
  },

  // method for getting a user
  getUser: (username) => {
    return knex('users').where({username}).first();
  },

  // method for comparing passwords
  comparePass: (userPassword, databasePassword) => {
    const bool = bcrypt.compareSync(userPassword, databasePassword);
    if (!bool) throw new Error('password does not match');
    else return true;
  }
})



module.exports = bookshelf.model('Auth', Auth)
