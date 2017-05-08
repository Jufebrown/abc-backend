`use strict`

// code from http://mherman.org/blog/2016/10/28/token-based-authentication-with-node/#.WRCtf2TyuHq - a tutorial on web token auth
const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(user) {
  const playload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id
  };
  return jwt.encode(playload, process.env.TOKEN_SECRET);
}

module.exports = {
  encodeToken
};
