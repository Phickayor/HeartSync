const transporter = require("../config/transporter.config");
const authModel = require("../models/auth.model");
const profileModel = require("../models/profile.model");
const { accessPayload, signPayload } = require("../utilities/auth");
const { handleEncryption, comparePassword } = require("../utilities/encrypt");
const generateOtp = require("../utilities/generateOtp");

const registerAUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const hashedPassword = await handleEncryption(password);
    const findUser = await authModel.findOne({ email });
    if (findUser) {
      res.status(403).json({
        message: "Account already exist",
        success: false
      });
    } else {
      const createAccount = await authModel.create({
        email,
        password: hashedPassword
      });
      if (createAccount) {
        res.status(200).json({
          message: "Account created Sucessfully",
          success: true
        });
      }
    }
  } catch (error) {
    res.status(502).json({ message: error.message, success: false });
  }
};

const logInUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const userAuth = await authModel.findOne({ email });
    if (userAuth) {
      var verifyPassword = await comparePassword(password, userAuth?.password);

      if (verifyPassword) {
        var token = signPayload({ ...userAuth._doc });
        res.status(200).json({
          message: `Successful Login`,
          token
        });
      } else {
        res.status(403).json({ message: "Incorrect password" });
      }
    } else {
      res.status(403).json({ message: "This Account does not exist" });
    }
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};
const sendVerificationMail = async (req, res) => {
  try {
    var otp = generateOtp(6);
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
    const mailOptions = {
      from: "jetawof@gmail.com",
      to: req.query.mailAddress,
      subject: "Verify your new HiBuddy Account",
      html: verificationMail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(502).json({ error: err.message });
      } else {
        console.log(info.response + "\n" + otp);

        res.status(200).json({ success: true, status: info.response });
      }
    });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};
const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      //Get Token
      var tokenArray = token.split("");
      var justTokenArray = tokenArray.splice(7);
      var justToken = justTokenArray.join("");
      var { _id } = accessPayload(justToken);
      var userAuth = await authModel.findOne({ _id });
      //Proceed on success
      userAuth
        ? ((req.body.auth = { ...userAuth }), next())
        : res
            .status(403)
            .json({ message: "Authorization is invalid or expired" });
    } else {
      res.status(403).json({ message: "No Authorization Header" });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
const getAuth = async (req, res) => {
  try {
    var userAuth = await authModel.findOne({ _id: req.params.authId });
    userAuth
      ? res.status(200).json({ userAuth })
      : res.status(404).json({ message: error.message });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
const editAuth = async (req, res) => {
  try {
    var updateAuth = await authModel.findByIdAndUpdate(
      req.body.auth._doc._id,
      req.body
    );
    updateAuth
      ? res.status(200).json({ message: "Profile updated successfully" })
      : res
          .status(501)
          .json({ message: "An error occured while updating profile " });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
  res.end();
};

const deleteAccount = async (req, res) => {
  try {
    var deleteProfile = await profileModel.deleteOne({
      auth: req.body.auth._id
    });
    var deleteAuth = await authModel.deleteOne({ _id: req.body.auth._id });
    if (deleteProfile && deleteAuth) {
      req.body = "";
      req.headers.authorization = "";
      res
        .status(200)
        .json({ message: "Account Successfully deleted", data: req.headers });
    }
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
module.exports = {
  registerAUser,
  logInUser,
  sendVerificationMail,
  checkAuth,
  getAuth,
  editAuth,
  deleteAccount
};
