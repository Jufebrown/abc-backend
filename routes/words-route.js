`use strict`

const {Router} = require('express')
const router = Router()
const Auth = require('../models/auth')
const {getWord, addWord} = require('../controllers/wordsCtrl')

router.get('/word/:correct_word', Auth.ensureAuthenticated, getWord)
router.post('/words/new', Auth.ensureAuthenticated, addWord)

module.exports = router
