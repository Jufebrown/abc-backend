const users_games = require('../users_games')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_games').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_games').insert(users_games);
    });
};
