`use strict`

const {Router} = require('express')
const router = Router()
const Auth = require('../models/auth')
const {getWord} = require('../controllers/wordsCtrl')

router.get('/word', Auth.ensureAuthenticated, getWord)

module.exports = router
