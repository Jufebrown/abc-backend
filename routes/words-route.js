`use strict`

const {Router} = require('express')
const router = Router()
const Auth = require('../models/auth')
const {getWord, addWord} = require('../controllers/wordsCtrl')

// get word route
router.get('/word/:correct_word', Auth.ensureAuthenticated, getWord)
// add word route
router.post('/words/new', Auth.ensureAuthenticated, addWord)

module.exports = router
