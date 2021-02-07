const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Create new user
router.post("/api/exercise/new-user", userController.createUser);

// Get array of all users
router.get("/api/exercise/users", userController.getUsers);

// Add new exercise session
router.post("/api/exercise/add", userController.addSession);

// Get a user's exercise log
router.get("/api/exercise/log", userController.getUserLog);

module.exports = router;
