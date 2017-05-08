const {bookshelf} = require('../db/database')
// require('./userFriend')
// require('./friend')
require('./game')
require('./userGame')

const User = bookshelf.Model.extend({
  tableName: 'users',
  // sets relationship with games
  game: function () { return this.belongsToMany('Game').through('userGame')}
  // sets relationship with friends
  // friend: function () { return this.belongsToMany('Friend').through('userFriend')},
}, {
  // gets single user
  getSingleUser: function(id) {
    return this.forge().fetchAll()
  }

})

module.exports = bookshelf.model('User', User)
