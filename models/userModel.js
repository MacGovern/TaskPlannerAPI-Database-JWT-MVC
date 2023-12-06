const { runQuery } = require('../utils/dbUtils');

async function getUser(email) {
    return (await runQuery(`SELECT * FROM users WHERE email = ?`, [email]))[0];
}

async function createUser(email, password) {
    await runQuery(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password]);
}

module.exports = { getUser, createUser };