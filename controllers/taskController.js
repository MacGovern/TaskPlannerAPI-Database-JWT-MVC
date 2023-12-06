const taskModel = require('../models/taskModel');
const { isValidId } = require('../utils/validationUtils');

async function getTasks(req, res) {
    try {
        res.status(200).json(await taskModel.getTasks(req.user));
    } catch (error) {
        res.status(500).json({ error: "The server encountered an unexpected condition that prevented it from fulfilling the request" });
    }
}

async function getTask(req, res) {
    if (!isValidId(req.params.id))
        res.status(400).json({ error: "Invalid ID" });
    else {
        try {
            const task = await taskModel.getTask(req.params.id);
            if (task && task.user === req.user)
                res.status(200).json(task);
            else
                res.status(403).json({ error: "You do not have permission to access this resource" });
        } catch (error) {
            res.status(500).json({ error: "The server encountered an unexpected condition that prevented it from fulfilling the request" });
        }
    }
}

async function createTask(req, res) {
    try {
        await taskModel.createTask(req.user, req.body.name, req.body.description, req.body.status)
        res.status(201).json(await taskModel.getLastInsertedTask());
    } catch (error) {
        if (error.sqlState === '45000')
            res.status(400).json({ error: 'A task with the same name and description already exists' });
        else
            res.status(500).json({ error: "The server encountered an unexpected condition that prevented it from fulfilling the request" });
    }
}

async function modifyTask(req, res) {
    if (!isValidId(req.params.id))
        res.status(400).json({ error: "Invalid ID" });
    else {
        try {
            const task = await taskModel.getTask(req.params.id);
            if (task && task.user === req.user) {
                await taskModel.updateTask(req.body.name, req.body.description, req.body.status, id)
                res.status(200).json(await taskModel.getTask(id));
            } else
                res.status(403).json({ error: "You do not have permission to update this resource" });
        } catch (error) {
            if (error.sqlState === '45000')
                res.status(400).json({ error: 'Cannot update status to To-Do once it has already been changed' });
            else
                res.status(500).json({ error: "The server encountered an unexpected condition that prevented it from fulfilling the request" });
        }
    }
}

async function deleteTask(req, res) {
    if (!isValidId(req.params.id))
        res.status(400).json({ error: "Invalid ID" });
    else {
        try {
            const task = await taskModel.getTask(req.params.id);
            if (task && task.user === req.user) {
                if ((await taskModel.deleteTask(id)).affectedRows === 0)
                    res.status(404).json({ error: "Resource not found" });
                else
                    res.sendStatus(204);
            } else
                res.status(403).json({ error: "You do not have permission to delete this resource" });
        } catch (error) {
            res.status(500).json({ error: "The server encountered an unexpected condition that prevented it from fulfilling the request" });
        }
    }
}

module.exports = { getTasks, getTask, createTask, modifyTask, deleteTask }