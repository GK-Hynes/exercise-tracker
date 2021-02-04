const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Please provide a username"
  },
  log: [{ type: Schema.Types.ObjectId, ref: "Session" }]
});

module.exports = mongoose.model("User", userSchema);
