`use strict`

const express = require('express')
const router = express.Router()
const Auth = require('../models/auth')
const {getUserGames, register, login, makeSureAuthenticated} = require('../controllers/authCtrl')

router.post('/auth/login', login)
router.post('/auth/register', register)
router.get('/auth/user', Auth.ensureAuthenticated, (req, res, next) => {
  res.status(200).json({
    status: 'success',
  })
})
router.get('/auth/games', getUserGames)

module.exports = router
