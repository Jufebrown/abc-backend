`use strict`

const {bookshelf} = require('../db/database')
const User = require('../models/user')
const UserGame = require('../models/userGame')


module.exports.getUserGames = ({query: {userId}}, res, next) => {
  console.log('getting a user and their games', userId)
  User.forge({id: userId})
  .fetch({withRelated: ['games'], require: true})
  .then((usergames) => {
    res.status(200).json(usergames)
    console.log('usergames', usergames.toJSON())
  })
  .catch((err) => {
    next(err)
  })
}
