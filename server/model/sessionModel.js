const mongoose = require("mongoose");
const subsessionModel = require("./subsessionModel");

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subsession:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subsessionModel",
  }]
});

module.exports = mongoose.model("sessionModel", sessionSchema);
