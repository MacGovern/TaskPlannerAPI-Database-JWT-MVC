const express = require('express');
const { authenticateAndUpdateToken } = require('../middleware/authenticateAndUpdateToken');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.use(authenticateAndUpdateToken);

router.get("/tasks", taskController.getTasks);
router.get("/tasks/:id", taskController.getTask);
router.post("/tasks", taskController.createTask);
router.patch("/tasks/:id", taskController.modifyTask);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;