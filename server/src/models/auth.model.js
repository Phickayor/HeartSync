const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  firstName: {
    type: String,
    required: [true, "User name is required"]
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
});

const authModel = mongoose.model("auth", authSchema);
module.exports = authModel;
