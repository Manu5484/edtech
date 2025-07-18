const mongoose = require("mongoose");

const subsessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  timeDuration: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  videoUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("subsessionModel", subsessionSchema);
