const userModel = require('../models/userModel');
const { ACCESS_TOKEN_SECRET, TOKEN_EXPIRATION_TIME, SALT_ROUNDS, COOKIE_OPTIONS } = require('../config/authConstants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        await userModel.createUser(req.body.email, await bcrypt.hash(String(req.body.password), SALT_ROUNDS));
        res.sendStatus(201);
    } catch (error) {
        if (error.errno === 1062)
            res.status(409).json({ error: "The email address is already in use" });
        else
            res.status(500).json({ error: "The server encountered an unexpected condition that prevented it from fulfilling the request" });
    }
}

async function logInUser(req, res) {
    try {
        const user = await userModel.getUser(req.body.email);
        if (user) {
            if (await bcrypt.compare(String(req.body.password), user.password)) {
                res.cookie("accessToken", jwt.sign({ email: req.body.email }, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME }), COOKIE_OPTIONS);
                res.sendStatus(200);
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ error: "Cannot find user" });
        }
    } catch (error) {
        res.status(500).json({ error: "The server encountered an unexpected condition that prevented it from fulfilling the request" });
    }
}

function logOutUser(req, res) {
    res.clearCookie('accessToken');
    res.sendStatus(204);
}

module.exports = { registerUser, logInUser, logOutUser };