'use strict'

// requirements and variable declarations
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

// gets a specified game and the words that were used in it
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

// adds a new game to games table and the users_games table
module.exports.addGame = (req, res, next) => {
  let header = req.headers.authorization.split(' ')
  let token = header[1]
  // saves the game
  Game.forge(req.body)
  .save()
  .then((game) => {
    // sends back success status and game object
    res.status(201).json(game)
    // gets user id and adds an entry to the users_games table
    localAuth.decodeToken(token, (err, payload) => {
      return knex('users').where({id: parseInt(payload.sub)}).first()
      .then((user) => {
        const user_id = user.id
        const game_id = game.toJSON().id
        // console.log('user_id, game_id', user_id, game_id)
        UserGame.forge({user_id, game_id})
        .save()
      })
    })
  })
  .catch((err) => {
    next(err)
  })
}

// updates specified game
module.exports.updateGame = (req,res,next) =>{
  const number_correct = req.body.number_correct
  const number_asked = req.body.number_asked
  const number_unique = req.body.number_unique
  const {gameId} = req.params
  const id = gameId
  Game.updateGame(id, number_asked, number_correct, number_unique)
  .then(game => res.status(200).json(game))
  .catch(err => next(err))
}
