'use strict'

const {bookshelf} = require('../db/database')
require('./gameWord')
require('./word')
require('./auth')
require('./userGame')

const Game = bookshelf.Model.extend({
  tableName: 'games',
  // sets relationship with users
  users: function () { return this.belongsToMany('Auth').through('UserGame')},
  // sets relationship with words
  words: function () { return this.belongsToMany('Word').through('gameWord')}
}, {
  // gets all games
  getAllGames: function() {
    return this.forge().orderBy('id', 'ASC').fetchAll()
  }
})

module.exports = bookshelf.model('Game', Game)
