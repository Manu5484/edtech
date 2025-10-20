const mongoose = require("mongoose");
const mailSender = require("../utile/mailSender"); // Make sure this path is correct

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
    // FIX: Removed parentheses. This now correctly sets the timestamp for each new document.
    default: Date.now,
    // This TTL index will automatically delete the document after 5 minutes (300 seconds).
    expires: 5 * 60,
  },
});

// Function to send the verification email
async function sendVerificationEmail(email, otp) {
  // We will let errors be thrown from here to be caught by the pre-save hook.
  await mailSender(
    email,
    "Verification Email For Your Account",
    `<p>Your OTP for signing up is: <b>${otp}</b></p><p>This code will expire in 5 minutes.</p>`
  );
}

// pre-save hook to send email before saving the document
otpSchema.pre("save", async function (next) {
  // Only send an email when a new document is created.
  if (this.isNew) {
    try {
      await sendVerificationEmail(this.email, this.otp);
      // If email is sent successfully, proceed with saving.
      next();
    } catch (error) {
      console.error("Error sending verification email in pre-save hook:", error);
      // If email sending fails, do not save the document and pass the error.
      // This will be caught by the controller's main try-catch block.
      next(error);
    }
  } else {
    // If the document is being updated, not created, just proceed.
    next();
  }
});

module.exports = mongoose.model("otpModel", otpSchema);
