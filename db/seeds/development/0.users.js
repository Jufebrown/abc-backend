`use strict`

const users = require('../users')
const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('password', salt);
    return Promise.join(
      knex('users').insert({
        username: 'jufe',
        password: hash
      })
    );
  });
};
