const {bookshelf} = require('../db/database')
// require('./userFriend')
// require('./friend')
require('./game')
require('./userGame')

const User = bookshelf.Model.extend({
  tableName: 'users',
  // sets relationship with games
  games: function () { return this.belongsToMany('Game').through('UserGame')}
  // sets relationship with friends
  // friend: function () { return this.belongsToMany('Friend').through('userFriend')},
}, {


})

module.exports = bookshelf.model('User', User)
