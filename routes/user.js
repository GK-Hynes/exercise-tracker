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
      user.save();
      return res.json({ username: user.username, _id: user._id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

// Get array of all users
router.get("/api/exercise/users", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

// Add new exercise session
router.post("/api/exercise/add", async (req, res) => {
  const { userId, description } = req.body;
  const duration = parseInt(req.body.duration);
  const date = req.body.date || new Date().toISOString().substring(0, 10);

  try {
    let session;
    session = new Session({
      userId,
      description,
      duration,
      date
    });
    session.save();

    // Return user object with exercise log details
    const user = await User.findOne({ _id: userId });
    user.log.push(session);
    user.save();
    return res.json({
      _id: user._id,
      username: user.username,
      date: new Date(date).toDateString(),
      duration,
      description
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

// Get a user's exercise log
router.get("/api/exercise/log", async (req, res) => {
  const { userId } = req.query;

  try {
    let user = await User.findOne({ _id: userId });
    // Limit exercise log
    if (req.query.limit) {
      user.log = user.log.slice(0, req.query.limit);
    }
    // Filter by dates
    if (req.query.from || req.query.to) {
      const startDate =
        new Date(req.query.from).getTime() || new Date(0).getTime();
      const endDate = new Date(req.query.to).getTime() || new Date().getTime();

      user.log = user.log.filter((session) => {
        const sessionDate = new Date(session.date).getTime();
        return sessionDate >= startDate && sessionDate <= endDate;
      });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
