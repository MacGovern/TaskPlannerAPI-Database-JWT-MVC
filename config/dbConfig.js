require('dotenv').config();

const DB_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'task_planner',
    connectionLimit: 1
};

module.exports = { DB_CONFIG }