const transporter = require("../config/transporter.config");
const authModel = require("../models/auth.model");
const profileModel = require("../models/profile.model");
const { accessPayload, signPayload } = require("../utilities/auth");
const { handleEncryption, comparePassword } = require("../utilities/encrypt");
const generateOtp = require("../utilities/generateOtp");

const registerAUser = async (req, res) => {
  try {
    let { email, password, firstName } = req.body;
    const hashedPassword = await handleEncryption(password);
    const createAccount = await authModel.create({
      firstName,
      email,
      password: hashedPassword
    });
    if (createAccount) {
      res.status(200).json({
        message: "Account created Sucessfully",
        success: true
      });
    }
  } catch (error) {
    res.status(502).json({ error: error.message, success: false });
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
          data: token
        });
      }
    } else {
      res.status(403).json({ mesage: "This Account does not exist" });
    }
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
};
const sendVerificationMail = async (req, res) => {
  try {
    var otp = generateOtp(6);
    const mailOptions = {
      from: "jetawof@gmail.com",
      to: req.query.mailAddress,
      subject: "Email Verification",
      html: `Hello there,</b> <br/><br/> This is your OTP to Verify your email on <b>Baby BOo</b>: ${otp} .<br/><br/> <i>PS: OTP expires in 5 minutes time.</i> <br/><br/><b> Thanks, from Baby Boo Team</b>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(502).json({ error: err.message });
      } else {
        console.log(info.response);

        res.status(200).json({ success: true, otp, status: info.response });
      }
    });
  } catch (error) {
    res.status(502).json({ error: error.message });
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
      console.log(userAuth);
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
    res.status(403).json({ message: error });
  }
};

module.exports = {
  registerAUser,
  logInUser,
  sendVerificationMail,
  checkAuth
};
