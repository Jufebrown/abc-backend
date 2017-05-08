`use strict`

const {Router} = require('express')
const router = Router()

const {getAllGames} = require('../controllers/gamesCtrl')

router.get('/games', getAllGames)

module.exports = router
