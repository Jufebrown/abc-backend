`use strict`

const express = require('express')
const router = express.Router()
const Auth = require('../models/auth')
const {getUserGames, register, login, makeSureAuthenticated, getUserFriends} = require('../controllers/authCtrl')

router.post('/auth/login', login)
router.post('/auth/register', register)
router.get('/auth/user', Auth.ensureAuthenticated, makeSureAuthenticated)
router.get('/user/games', Auth.ensureAuthenticated, getUserGames)
router.get('/user/friends', Auth.ensureAuthenticated, getUserFriends)

module.exports = router
