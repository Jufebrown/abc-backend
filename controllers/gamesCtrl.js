'use strict'

const Game = require('../models/game')
const UserGame = require('../models/userGame')

// Fetches games from database when called
// responds with status code 200 and json of games if successful
module.exports.getGamesAll = (req, res, next) => {
  Game.getAllGames()
  .then(games => res.status(200).json({games}))
  .catch(error => next(error))
}
