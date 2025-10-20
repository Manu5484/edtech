const nodemailer = require("nodemailer");
require("dotenv").config();

async function mailSender(email, title, body) {
  try {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      // MODIFICATION: Explicitly set the port and secure connection.
      // Most email providers use port 465 for secure connections.
      port: 465,
      secure: true, // Use true for port 465, false for other ports.
      auth: {
        user: process.env.MAIL_USER, // Your email address
        pass: process.env.MAIL_PASS, // Your email's app password
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"EdTech Platform" <no-reply@edtech.com>',
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully: %s", info.messageId);
    return info;

  } catch (error) {
    console.error("!!! FATAL ERROR in mailSender !!!:", error);
    throw error;
  }
}

module.exports = mailSender;

