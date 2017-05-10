'use strict'

const { Router } = require('express')
const router = Router()

router.use(require('./auth-route'))
router.use(require('./games-route'))
router.use(require('./words-route'))
// router.use(require('./friends-route'))

router.get('/', (req,res) => {
  res.json ({
    "login": "/api/v1/auth/login",
    "register": "/api/v1/auth/register",
    "getLoggedInUser": "/api/v1/auth/user",
    "getGamesForLoggedInUser": "/api/v1/user/games",
    "getFriendsForLoggedInUser": "/api/v1/user/friends",
    "getAllgames": "/api/v1/games",
    "getWord" : "/api/v1/word/:<correct_word>",
    "getWordsForSpecifiedGame": "/api/v1/games/words?gameId=<gameId>"
  })
})

module.exports = router;
