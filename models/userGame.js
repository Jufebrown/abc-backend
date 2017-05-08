`use strict`

const {bookshelf} = require('../db/database')
require('./game')
require('./user')

// sets up relations for join table
const UserGame = bookshelf.Model.extend({
  tableName: 'users_games',
  user: function() {
    return this.belongsTo('User')
  },
  game: function() {
    return this.belongsTo('Game')
  }
})

module.exports = bookshelf.model('UserGame', UserGame)
