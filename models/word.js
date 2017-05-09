'use strict'

const {bookshelf} = require('../db/database')
require('./game')
require('./gameWord')

const Word = bookshelf.Model.extend({
  tableName: 'words',
  // sets relationship with games
  games: function () { return this.belongsToMany('Game').through('GameWord')}
}, {
  // gets all games
  getAllWords: function() {
    return this.forge().orderBy('id', 'ASC').fetchAll()
  }
})

module.exports = bookshelf.model('Word', Word)
