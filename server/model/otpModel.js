const mongoose = require("mongoose");
const mailSender = require("../utile/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires:5*60
  }
});

async function sendVerificationCode(email,otp)
{
  try{
    const mailResponse=await mailSender(email,"verification email for sign in ",`${otp} this is your otp for signing up, it expries in 5min`);
    // console.log("mail response ",mailResponse);
  }
  catch(error)
  {
    console.log(error.message);
  }
}

otpSchema.pre('save', async function(next){
  await sendVerificationCode(this.email,this.otp);
  next();
})

module.exports = mongoose.model("otpModel", otpSchema);
