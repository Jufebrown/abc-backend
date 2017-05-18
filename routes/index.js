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
    "login": "https://warm-harbor-25906.herokuapp.com/api/v1/auth/login",
    "register": "https://warm-harbor-25906.herokuapp.com/api/v1/auth/register",
    "getLoggedInUser": "https://warm-harbor-25906.herokuapp.com/api/v1/auth/user",
    "getGamesForLoggedInUser": "https://warm-harbor-25906.herokuapp.com/api/v1/user/games",
    "getFriendsForLoggedInUser": "https://warm-harbor-25906.herokuapp.com/api/v1/user/friends",
    "getAllgames": "https://warm-harbor-25906.herokuapp.com/api/v1/games",
    "getWord" : "https://warm-harbor-25906.herokuapp.com/api/v1/word/:<correct_word>",
    "addWord": "https://warm-harbor-25906.herokuapp.com/api/v1/words/new",
    "addGame": "https://warm-harbor-25906.herokuapp.com/api/v1/games/new",
    "updateGame": "https://warm-harbor-25906.herokuapp.com/api/v1/games/:<gameId>",
    "getWordsForSpecifiedGame": "https://warm-harbor-25906.herokuapp.com/api/v1/games/words?gameId=<gameId>"
  })
})

module.exports = router;
