`use strict`

const express = require('express')
const router = express.Router()
const {getUserGames, register, login, makeSureAuthenticated} = require('../controllers/authCtrl')

router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/auth/games', getUserGames)
router.get('/auth/user', makeSureAuthenticated)

module.exports = router
