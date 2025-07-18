const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true
  },
  whatYouWillLearn: {
    type: String,
    trim: true
  },
  courseContent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "sessionModel" 
  }],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  ratingAndReviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ratingReviewModel"
  }],
  tags: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tagModel"
  },
  studentsenrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true
  }],
  thumbnailUrl:{
    type:String
  }
} );

module.exports = mongoose.model("coursesModel", courseSchema);
