const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dob: {
    type: Date,
  },
  mobile: {
    type: String,
    trim: true
  },
  about: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("profileModel", profileSchema);
