const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, TOKEN_EXPIRATION_TIME, COOKIE_OPTIONS } = require('../config/authConstants');

function createCookieWithAccessToken(res, email) {
  res.cookie("accessToken", jwt.sign({ email: email }, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME }), COOKIE_OPTIONS);
}

module.exports = { createCookieWithAccessToken };