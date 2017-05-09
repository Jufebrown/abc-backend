`use strict`

const {Router} = require('express')
const router = Router()
const Auth = require('../models/auth')
const Game = require('../models/game')
const {getGamesAll} = require('../controllers/gamesCtrl')

router.get('/games', Auth.ensureAuthenticated, getGamesAll)

module.exports = router
