const jwt = require('jsonwebtoken');
require('dotenv').config();
const authUtils = require('../utils/authUtils');
const { ACCESS_TOKEN_SECRET } = require('../config/authConstants');

function authenticateAndUpdateToken(req, res, next) {
    const token = req.cookies.accessToken;
    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(403).json({ error: "User authentication failed or session expired" });
            else {
                req.user = user.email;
                authUtils.createCookieWithAccessToken(res, req.user);
                next();
            }
        });
    }
    else {
        return res.status(401).json({ error: "Token is missing" });
    }
}

module.exports = { authenticateAndUpdateToken }