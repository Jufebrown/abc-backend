`use strict`

const {Router} = require('express')
const router = Router()

const {getGamesAll} = require('../controllers/gamesCtrl')

router.get('/games', getGamesAll)

module.exports = router
