const mariadb = require("mariadb");
const { DB_CONFIG } = require('../config/dbConfig');
const pool = mariadb.createPool(DB_CONFIG);

async function runQuery(query, params = []) {
    const connection = await pool.getConnection();
    try {
        return await connection.query(query, params);
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { runQuery };