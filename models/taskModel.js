const { runQuery } = require('../utils/dbUtils');

async function getTasks(user) {
    return await runQuery(`SELECT * FROM tasks WHERE user = ?`, [user]);
}

async function getTask(id) {
    return (await runQuery(`SELECT * FROM tasks WHERE id = ?`, [id]))[0];
}

async function createTask(user, name, description, status) {
    await runQuery(`INSERT INTO tasks (user, name, description, created_at, updated_at, status) VALUES (?, ?, ?, NOW(3), NOW(3), ?)`, [user, name, description || null, status || 'To-Do'])
}

async function getLastInsertedTask() {
    return (await runQuery(`SELECT * FROM tasks WHERE id = LAST_INSERT_ID()`))[0];
}

async function updateTask(name, description, status, id) {
    let query = "UPDATE tasks SET ";
    const params = [];
    if (name) {
        query += "name = ?, ";
        params.push(name);
    }
    if (description) {
        query += "description = ?, ";
        params.push(description);
    }
    if (status) {
        query += "status = ?, ";
        params.push(status);
    }    
    query = query.slice(0, -2); // Removes the trailing comma and space
    query += " WHERE id = ?";
    params.push(id);
    await runQuery(query, params);
}

async function deleteTask(id) {
    return (await runQuery(`DELETE FROM tasks WHERE id = ?`, [id]));
}

module.exports = { getTasks, getTask, createTask, getLastInsertedTask, updateTask, deleteTask }