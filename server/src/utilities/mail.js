const generateOtp = require("./generateOtp");

const VerificationMail = (digits) => {
  return `<!DOCTYPE html>
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

            <p>Please use the following One-Time Password (OTP) to complete the verification process: <span class="otp-code">${generateOtp(
              digits
            )}</span></p>

            <p class="note"><strong>IMPORTANT:</strong> Do not share this OTP with anyone, including HiBuddy support. We will never ask for your OTP or any sensitive information. Keep your account secure by keeping this code confidential.</p>

            <p>If you did not attempt to create an account with HiBuddy, please ignore this email. It's possible that someone entered your email address by mistake.</p>

            <p>Thank you for choosing HiBuddy. We appreciate your trust and look forward to providing you with a seamless and secure experience.</p>

            <p>Best regards,</p>
            <p>HiBuddy</p>
            <p>helpdesk@hibuddy.com</p>
        </body>

      </html>
`;
};

const ResetPasswordMail = (name, token) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }
    .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .content {
        text-align: center;
    }
    .btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
    }
</style>
</head>
<body>
<div class="container">
    <div class="content">
        <h2>Password Reset</h2>
        <p>Hello ${name},</p>
        <p>You have requested to reset your password. Please click the link below to reset it. Remember, this link expires in 15 minutes.</p>
        <a class="btn" href="https://localhost:3000/auth/reset-password?token=${token}">Reset Password</a>
    </div>
</div>
</body>
</html>
`;
};
module.exports = {
  VerificationMail,
  ResetPasswordMail
};
