`use strict`

// code from http://mherman.org/blog/2016/10/28/token-based-authentication-with-node/#.WRCtf2TyuHq - a tutorial on web token auth
const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(user) {
  console.log('TOKEN_SECRET', process.env.TOKEN_SECRET)
  const payload = {
    // expiration date of token
    exp: moment().add(14, 'days').unix(),
    // time token is generated
    iat: moment().unix(),
    // subject of token
    sub: user.id
  };
  return jwt.encode(playload, process.env.TOKEN_SECRET);
}

module.exports = {
  encodeToken
};
