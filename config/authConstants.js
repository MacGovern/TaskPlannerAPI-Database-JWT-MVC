require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const TOKEN_EXPIRATION_TIME = 30; // in seconds
const SALT_ROUNDS = 10;
const COOKIE_OPTIONS = {
    secure: true,
    httpOnly: true,
    sameSite: "none"
}

module.exports = {
    ACCESS_TOKEN_SECRET,
    TOKEN_EXPIRATION_TIME,
    SALT_ROUNDS,
    COOKIE_OPTIONS
}