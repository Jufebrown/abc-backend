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

module.exports.addGame = (req, res, next) => {
  // console.log('body', req.body)
  let header = req.headers.authorization.split(' ')
  let token = header[1]
  Game.forge(req.body)
  .save()
  .then((res) => {
    // console.log('res', res.toJSON())
    localAuth.decodeToken(token, (err, payload) => {
      return knex('users').where({id: parseInt(payload.sub)}).first()
      .then((user) => {
        const user_id = user.id
        const game_id = res.toJSON().id
        // console.log('user_id, game_id', user_id, game_id)
        UserGame.forge({user_id, game_id})
        .save()
      })
    })
  })
  .then((userGame) => {
    res.status(201).json(userGame)
  })
  .catch((err) => {
    next(err)
  })
}
