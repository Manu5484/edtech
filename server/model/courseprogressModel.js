const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coursesModel",
    required: true
  },
  completedVideos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "subsessionModel" 
  }],
}, );

module.exports = mongoose.model("courseprogressModel", courseProgressSchema);
