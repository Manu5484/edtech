const nodemailer = require("nodemailer");
require("dotenv").config();

async function mailSender(email, title, body) {
  try {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false, // Use 'true' if your host uses SSL/TLS on port 465
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"EdTech Platform" <no-reply@edtech.com>', // A professional "from" address
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully: %s", info.messageId);
    return info; // Return mail information on success

  } catch (error) {
    console.error("Error occurred in mailSender:", error.message);
    // FIX: Re-throw the error so the function that called mailSender knows it failed.
    throw error;
  }
}

module.exports = mailSender;
