const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: "Please enter a description"
  },
  duration: {
    type: Number,
    required: "Please enter a duration in minutes"
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "Please provide a userId"
  }
});

module.exports = mongoose.model("Session", sessionSchema);
