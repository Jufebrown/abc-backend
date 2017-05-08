`use strict`

const {Router} = require('express')
const router = Router()

const {getGamesAll} = require('../controllers/usersCtrl')

router.get('/users/games', getUserGames)

module.exports = router
