`use strict`

const express = require('express')
const router = express.Router()
const Auth = require('../models/auth')
const {getUserGames, register, login, makeSureAuthenticated, getUserFriends} = require('../controllers/authCtrl')

// login route
router.post('/auth/login', login)
// register route
router.post('/auth/register', register)
// get user route
router.get('/auth/user', Auth.ensureAuthenticated, makeSureAuthenticated)
// get games for specified user route
router.get('/user/games', Auth.ensureAuthenticated, getUserGames)
// get friends for specified user route
router.get('/user/friends', Auth.ensureAuthenticated, getUserFriends)

module.exports = router
