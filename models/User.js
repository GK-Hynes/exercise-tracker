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

// Add count virtual type
userSchema.virtual("count").get(function () {
  return this.log.length;
});

function autopopulate(next) {
  this.populate("log");
  next();
}

userSchema.pre("find", autopopulate);
userSchema.pre("findOne", autopopulate);

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
