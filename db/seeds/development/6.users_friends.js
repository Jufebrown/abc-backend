`use strict`

const users_friends = require('../users_friends')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_friends').insert(users_friends);
    });
};
