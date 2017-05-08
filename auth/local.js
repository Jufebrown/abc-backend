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
  return jwt.encode(payload, process.env.TOKEN_SECRET);
}

function decodeToken(token, callback) {
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);
  const now = moment().unix();
  // check if the token has expired
  if (now > payload.exp) callback('Token has expired.');
  else callback(null, payload);
}

module.exports = {
  encodeToken,
  decodeToken
};
