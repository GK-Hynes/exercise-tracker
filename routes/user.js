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
      return res.json({ username: user.username, _id: user._id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

// Get array of all users
router.get("/api/exercise/users", async (req, res) => {
  const users = await User.find();
  return users;
});

// Add new exercise session
router.post("/api/exercise/add", async (req, res) => {
  const { userId, description, duration } = req.body;
  const date = req.body.date || Date.now();

  try {
    let session;
    session = new Session({
      userId,
      description,
      duration
    });
    session.save();

    // TODO - return user object with exercise session details
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

// Get a user's exercise log
router.get("/api/exercise/log", (req, res) => {});

module.exports = router;
