const nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
  service: "SMTP",
  host: "smtp-mail.outlook.com", // hostname
  port: 587, // port for secure SMTP
  auth: {
    user: "jetawof@gmail.com",
    pass: process.env.MAIL_PSWD
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false
  }
});

module.exports = transporter;
 