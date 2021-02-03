const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "Please provide a username"
  }
});

module.exports = mongoose.model("User", userSchema);
