'use strict'

const {bookshelf} = require('../db/database')
// require('./gameWord')
// require('./word')
// require('./user')
// require('./userGame')

const Animal = bookshelf.Model.extend({
  tableName: 'games',
  // sets relationship with words
  // words: function () { return this.belongsToMany('Word').through('gameWord')},
}, {
  // gets all games
  getAllGames: function () {
    return this.forge().orderBy('id', 'ASC')
  }
  // gets all games with a specified user
  // getAllWithRelated: function() {
  //   return this.forge().orderBy('id', 'ASC').fetchAll({withRelated: ['users']})
  // }
  // adds a game
  // addGame: function(game) {
  //   return this.forge(game).save({},{require: true})
  // },
  // use by cascade delete to delete games records from pivot table
  // dependents: ['users', 'words'],

  // edits game
  // updateGame: function(id,{number_correct, number_asked, won}) {
  //   // console.log("bodyFromModel",{age:10});
  //   return this.forge({id}).save({number_correct, number_asked, won})
  //   .then( (edit) =>{
  //     return{"msg" : "edited successfully"}
  //   })
  //   .catch( (err) =>{ return err})
  // }
})

module.exports = bookshelf.model('Game', Game)
