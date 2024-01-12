const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "SMTP",
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  auth: {
    user: "jetawof@gmail.com",
    pass: "fikayo@microsoft1"
  },
  tls: {
    ciphers: "SSLv3"
  }
});

module.exports = transporter;
