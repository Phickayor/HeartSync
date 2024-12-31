const fs = require("fs");
const path = require("path");
const transporter = require("../config/transporter.config");
const User = require("../models/user.model");
const { accessPayload, signPayload } = require("../utilities/auth");
const { handleEncryption, comparePassword } = require("../utilities/encrypt");
const generateOtp = require("../utilities/generateOtp");
const VerificationMail = require("../utilities/mail");
const { uploadToCloudinary } = require("../utilities/getImageUrl");

const CheckExistingUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.params.email });
    if (findUser) {
      res.status(403).json({
        existingUser: true,
        message: "An account already exists with this email address"
      });
    } else {
      res
        .status(200)
        .json({ existingUser: false, message: "Account does not exist" });
    }
  } catch (error) {
    res.status(501).json({
      existingUser: null,
      message: "Check your internet connection and try again"
    });
  }
};
const registerAUser = async (req, res) => {
  try {
    let {
      email,
      password,
      fullName,
      dob,
      userName,
      phoneNumber,
      school,
      gender,
      profilePicture,
      longBio,
      shortBio,
      cardPicture,
      preferences
    } = req.body;
    const hashedPassword = await handleEncryption(password);
    const findUser = await User.findOne({ email });
    if (findUser) {
      res.status(403).json({
        message: "Account already exist"
      });
    } else {
      if (profilePicture) {
        const uploadDir = path.join(__dirname, "uploads"); // Directory for uploads
        const tempFilePath = path.join(uploadDir, "temp-image.png"); // Temporary path

        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const base64Data = profilePicture.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
        fs.writeFileSync(tempFilePath, Buffer.from(base64Data, "base64"));
        const image = await uploadToCloudinary(tempFilePath);
        if (image.url) {
          profilePicture = image.url;
        } else {
          throw new Error(image.error);
        }
      }
      if (cardPicture) {
        const uploadDir = path.join(__dirname, "uploads"); // Directory for uploads
        const tempFilePath = path.join(uploadDir, "temp-image.png"); // Temporary path

        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const base64Data = cardPicture.replace(/^data:image\/\w+;base64,/, "");
        fs.writeFileSync(tempFilePath, Buffer.from(base64Data, "base64"));
        const image = await uploadToCloudinary(tempFilePath);
        if (image.url) {
          cardPicture = image.url;
        } else {
          throw new Error(image.error);
        }
      }
      const createAccount = await User.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName,
        dob,
        userName: userName.toLowerCase(),
        phoneNumber,
        school,
        gender,
        profilePicture,
        longBio,
        shortBio,
        cardPicture,
        preferences
      });
      if (createAccount) {
        res.status(200).json({
          message: "Account created Sucessfully"
        });
      } else {
        res.status(503).json({
          message: "An error occured please try again"
        });
      }
    }
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};

const logInUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const userDetails = await User.findOne({ email: email.toLowerCase() });
    if (userDetails) {
      let verifyPassword = await comparePassword(
        password,
        userDetails.password
      );
      if (verifyPassword) {
        let token = signPayload({ id: userDetails._id }, "2h");
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
    res.status(502).json({
      error: error.message,
      message:
        "An error occured, please check your internet connection and try again"
    });
  }
};

const sendVerificationMail = async (req, res) => {
  try {
    if (!req.user.isEmailVerified) {
      const verificationMail = await VerificationMail(6);
      const mailOptions = {
        from: "jetawof@gmail.com",
        to: req.user.email,
        subject: "Verify your Big Circle Account",
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
    } else {
      res.status(403).json({ message: "email is verified" });
    }
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
  res.end();
};
const forgotPassword = async (req, res) => {
  try {
    const userDetails = await User.findOne({
      email: req.body.email.toLowerCase()
    });
    const token = signPayload({ userDetails }, "15m");
    const mailBody = getMail.ResetPasswordMail(userDetails.fullName, token);
    const mailOptions = {
      from: "jetawof@gmail.com",
      to: userDetails.email,
      subject: "Reset Password on your Big Circle Account",
      html: mailBody
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
    res.status(502).json({
      error: error.message,
      message:
        "An error occured, please check your internet connection and try again"
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const payload = accessPayload(token);
    const encryptedPassword = await handleEncryption(newPassword);
    const updatePassword = await User.findByIdAndUpdate(payload._id, {
      password: encryptedPassword
    });
    if (updatePassword) {
      res.status(200).json({ message: "Pasword has been reset" });
      updatePassword.save();
    } else {
      res.status(501).json({ message: "An error occured please try again." });
    }
  } catch (error) {
    res.status(502).json({
      error: error.message,
      message:
        "An error occured, please check your internet connection and try again"
    });
  }
};
const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = accessPayload(token);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ unauthorized: true, message: error.message });
    }
  }

  if (!token) {
    res.status(401).json({ unauthorized: true, message: "User not logged in" });
  }
};
module.exports = {
  registerAUser,
  logInUser,
  sendVerificationMail,
  checkAuth,
  CheckExistingUser,
  resetPassword,
  forgotPassword
};
