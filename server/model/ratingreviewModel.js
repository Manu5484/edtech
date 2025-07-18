const mongoose = require("mongoose");

const ratingReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coursesModel",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("ratingReviewModel", ratingReviewSchema);
