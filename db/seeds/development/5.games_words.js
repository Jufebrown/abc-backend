`use strict`

const games_words = require('../games_words')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games_words').del()
    .then(function () {
      // Inserts seed entries
      return knex('games_words').insert(games_words);
    });
};
