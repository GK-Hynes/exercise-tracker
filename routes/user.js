const express = require("express");
const User = require("../models/User");
const Session = require("../models/Session");

const router = express.Router();

// Create new user
router.post("/api/exercise/new-user", async (req, res) => {
  const username = req.body.username;

  try {
    let user = await User.findOne({ username });
    if (user) {
      res.json({ username: user.username, _id: user._id });
    } else {
      user = new User({
        username
      });
      await user.save();
      user = await User.findOne({ username });
      res.json({ username: user.username, _id: user._id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

// Get array of all users
router.get("/api/exercise/users", (req, res) => {});

// Add new exercise session
router.post("/api/exercise/add", (req, res) => {});

// Get a user's exercise log
router.get("/api/exercise/log", (req, res) => {});

module.exports = router;
