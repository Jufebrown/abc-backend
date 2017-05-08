`use strict`

const express = require('express')
const router = express.Router()
const {getUserGames, register, login} = require('../controllers/authCtrl')

router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/auth/games', getUserGames)

module.exports = router
