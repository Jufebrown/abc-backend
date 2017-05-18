'use strict'

// requirements and variable declarations
const { Router } = require('express')
const router = Router()

router.use(require('./auth-route'))
router.use(require('./games-route'))
router.use(require('./words-route'))

// lists available endpoints
router.get('/', (req,res) => {
  res.json ({
    "login": "/api/v1/auth/login",
    "register": "/api/v1/auth/register",
    "getLoggedInUser": "/api/v1/auth/user",
    "getGamesForLoggedInUser": "/api/v1/user/games",
    "getFriendsForLoggedInUser": "/api/v1/user/friends",
    "getAllgames": "/api/v1/games",
    "getWord" : "/api/v1/word/:<correct_word>",
    "addWord": "/api/v1/words/new",
    "addGame": "/api/v1/games/new",
    "updateGame": "/api/v1/games/:<gameId>",
    "getWordsForSpecifiedGame": "/api/v1/games/words?gameId=<gameId>"
  })
})

module.exports = router;
