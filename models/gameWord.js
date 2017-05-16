`use strict`

const {bookshelf} = require('../db/database')
require('./game')
require('./word')

// sets up relations for join table
const gameWord = bookshelf.Model.extend({
  tableName: 'games_words',
  words: function() {
    return this.belongsTo('Word')
  },
  games: function() {
    return this.belongsTo('Game')
  }
})

module.exports = bookshelf.model('gameWord', gameWord)
