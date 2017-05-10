'use strict'

const Game = require('../models/game')
const UserGame = require('../models/userGame')
const localAuth = require('../auth/local')
const {knex} = require('../db/database')

// Fetches games from database when called
// responds with status code 200 and json of games if successful
module.exports.getGamesAll = (req, res, next) => {
  Game.getAllGames()
  .then(games => res.status(200).json({games}))
  .catch(error => next(error))
}

module.exports.getGameWords = ({query: {gameId}}, res, next) => {
  Game.forge({id: gameId})
  .fetch({withRelated: ['words'], require: true})
  .then((gameWords) => {
    res.status(200).json(gameWords)
  })
  .catch((err) => {
    next(err)
  })
}
