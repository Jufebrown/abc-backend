'use strict'

const { Router } = require('express')
const router = Router()

router.use(require('./auth-route'))
router.use(require('./games-route'))
// router.use(require('./words-route'))
// router.use(require('./friends-route'))

router.get('/', (req,res) => {
  res.json ({
    "login": "/api/v1/auth/login",
    "register": "/api/v1/auth/register",
    "user": "/api/v1/auth/user",
    "loggedInUserAndTheirGames": "/api/v1/auth/games",
    "games": "/api/v1/games"
    // "words" : "/api/v1/words",
    // "friends": "/api/v1/friends"
  })
})

module.exports = router;
