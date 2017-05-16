`use strict`

const {bookshelf} = require('../db/database')
require('./friend')
require('./auth')

// sets up relations for join table
const UserFriend = bookshelf.Model.extend({
  tableName: 'users_friends',
  user: function() {
    return this.belongsTo('Auth')
  },
  friend: function() {
    return this.belongsTo('Friend')
  }
})

module.exports = bookshelf.model('UserFriend', UserFriend)
