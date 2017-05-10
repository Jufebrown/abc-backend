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
  },

  // gets a single word (used to check if word is already in db)
  getSingleWord: function(correct_word) {
    return this.forge({correct_word})
    .fetch()
    .then( (word) => {
      return word
    })
    .catch( (error) => {
      return error
    })
  }

})

module.exports = bookshelf.model('Word', Word)
