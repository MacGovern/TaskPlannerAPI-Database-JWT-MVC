const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post("/users", userController.registerUser);
router.post("/login", userController.logInUser);
router.delete("/logout", userController.logOutUser);

module.exports = router;