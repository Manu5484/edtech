const nodemailer = require("nodemailer");
require("dotenv").config();

async function mailSender(email, title, body) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false, 
    });

    let info = await transporter.sendMail({
      from: '"EdTech Platform" <no-reply@edtech.com>',
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully: %s", info.messageId);
    return info;

  } catch (error) {
    // MODIFICATION: Log the ENTIRE error object. This is more descriptive.
    console.error("!!! FATAL ERROR in mailSender !!!:", error); 
    throw error;
  }
}

module.exports = mailSender;

