const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    location: { type: String, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
