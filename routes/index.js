'use strict'

const { Router } = require('express')
const router = Router()

router.use(require('./auth-route'))
router.use(require('./users-route'))
router.use(require('./games-route'))
// router.use(require('./words-route'))
// router.use(require('./friends-route'))
router.get('/',function (req,res) {
  res.json ({
    "userAndTheirGames": "/api/v1/users/games?userId=<userId>",
    "games": "/api/v1/games"
    "register": "/api/v1/auth/register"
    // "words" : "/api/v1/words",
    // "friends": "/api/v1/friends"
  })
})

module.exports = router;
