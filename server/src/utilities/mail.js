const generateOtp = require("./generateOtp");

const getMail = async (digits) => {
  var otp = generateOtp(digits);
  const verificationMail = `<!DOCTYPE html>
      <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Verification - OTP</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }

                h2 {
                    color: #333;
                }

                p {
                    color: #555;
                }

                .otp-code {
                    font-size: 18px;
                    font-weight: bold;
                    color: #007BFF;
                }

                .note {
                    color: #777;
                }
            </style>
        </head>

        <body>
            <h2>Account Verification - One-Time Password (OTP)</h2>

            <p>Dear Olufikayomi,</p>

            <p>We hope this email finds you well. Thank you for choosing HiBuddy and creating an account with us. To ensure the security of your account, we require you to verify your email address.</p>

            <p>Please use the following One-Time Password (OTP) to complete the verification process: <span class="otp-code">${otp}</span></p>

            <p class="note"><strong>IMPORTANT:</strong> Do not share this OTP with anyone, including HiBuddy support. We will never ask for your OTP or any sensitive information. Keep your account secure by keeping this code confidential.</p>

            <p>If you did not attempt to create an account with HiBuddy, please ignore this email. It's possible that someone entered your email address by mistake.</p>

            <p>Thank you for choosing HiBuddy. We appreciate your trust and look forward to providing you with a seamless and secure experience.</p>

            <p>Best regards,</p>
            <p>HiBuddy</p>
            <p>helpdesk@hibuddy.com</p>
        </body>

      </html>
`;
  return verificationMail;
};

module.exports = getMail;
