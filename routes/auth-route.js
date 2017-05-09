`use strict`

const express = require('express')
const router = express.Router()
const Auth = require('../models/auth')
const {getUserGames, register, login, makeSureAuthenticated} = require('../controllers/authCtrl')

router.post('/auth/login', login)
router.post('/auth/register', register)
router.get('/auth/user', Auth.ensureAuthenticated, makeSureAuthenticated)
router.get('/auth/games', Auth.ensureAuthenticated, getUserGames)

module.exports = router
