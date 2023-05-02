const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Is Required"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required"],
  },
  phonenumber: {
    type: String,
    required: [true, "Phone Number Is Required"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isUser: {
    type: Boolean,
    default: true,
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
