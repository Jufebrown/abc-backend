`use strict`

const {Router} = require('express')
const router = Router()
const Auth = require('../models/auth')
const {getGamesAll, getGameWords} = require('../controllers/gamesCtrl')

router.get('/games', Auth.ensureAuthenticated, getGamesAll)
router.get('/games/words', Auth.ensureAuthenticated, getGameWords)

module.exports = router
