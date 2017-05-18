`use strict`

const {Router} = require('express')
const router = Router()
const Auth = require('../models/auth')
const {getGamesAll, getGameWords, addGame, updateGame} = require('../controllers/gamesCtrl')

// these routes all have Auth.ensureAuthenticated as a first callback. Learned that you can have infinite callbacks on a route or even an array of callbacks as long as you use next()

// get all games route
router.get('/games', Auth.ensureAuthenticated, getGamesAll)
// get all words associated with specified game route
router.get('/games/words', Auth.ensureAuthenticated, getGameWords)
// add a new game route
router.post('/games/new', Auth.ensureAuthenticated, addGame)
// update game route
router.patch('/games/:gameId', Auth.ensureAuthenticated, updateGame)

module.exports = router
