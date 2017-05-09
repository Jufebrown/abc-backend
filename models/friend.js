'use strict'

const {bookshelf} = require('../db/database')
require('./auth')
require('./userFriend')

const Friend = bookshelf.Model.extend({
  tableName: 'friends',
  // sets relationship with users
  users: function () { return this.belongsToMany('Auth').through('UserFriend')}
}, {
  // gets all friends
  getAllFriends: function() {
    return this.forge().orderBy('id', 'ASC').fetchAll()
  }
})

module.exports = bookshelf.model('Friend', Friend)
