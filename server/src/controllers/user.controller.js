const fs = require("fs");
const path = require("path");
const User = require("../models/user.model");
const { handleEncryption } = require("../utilities/encrypt");
const { uploadToCloudinary } = require("../utilities/getImageUrl");
const editUser = async (req, res) => {
  try {
    let findUser = await User.findById(req.user._id);
    if (findUser) {
      if (req.body.password) {
        let encryptedPassword = await handleEncryption(req.body.password);
        req.body.password = encryptedPassword;
      }
      if (req.body.userName) {
        req.body.userName = req.body.userName.toLowerCase();
        const findUser = await User.findOne({ userName: req.body.userName });
        if (findUser) {
          return res.status(403).json({
            error: "Username taken , Kindly use another username "
          });
        }
      }
      if (req.body.profilePicture) {
        const uploadDir = path.join(__dirname, "uploads"); // Directory for uploads
        const tempFilePath = path.join(uploadDir, "temp-image.png"); // Temporary path

        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const base64Data = req.body.profilePicture.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
        fs.writeFileSync(tempFilePath, Buffer.from(base64Data, "base64"));
        const image = await uploadToCloudinary(tempFilePath);
        if (image.url) {
          req.body.profilePicture = image.url;
        } else {
          throw new Error(image.error);
        }
      }
      if (req.body.cardPicture) {
        const uploadDir = path.join(__dirname, "uploads"); // Directory for uploads
        const tempFilePath = path.join(uploadDir, "temp-image.png"); // Temporary path

        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const base64Data = req.body.cardPicture.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
        fs.writeFileSync(tempFilePath, Buffer.from(base64Data, "base64"));
        const image = await uploadToCloudinary(tempFilePath);
        if (image.url) {
          req.body.cardPicture = image.url;
        } else {
          throw new Error(image.error);
        }
      }
      let updateUser = await User.findByIdAndUpdate(req.user._id, req.body);
      updateUser
        ? res
            .status(200)
            .json({ success: true, message: "Profile updated successfully" })
        : res.status(501).json({
            success: false,
            message: "An error occured while updating profile "
          });
    } else {
      res.status(404).json({ success: false, message: "User not Found" });
    }
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
  res.end();
};

const getUser = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({ success: true, user: req.user });
    }
  } catch (error) {
    res.status(501).json({ success: false, error: error.message });
  }
};
const getSpecificUser = async (req, res) => {
  try {
    let profile = await User.findById(req.params.userId).select(
      "-password -isEmailVerified -phoneNumber"
    );
    profile
      ? res.status(200).json({ profile })
      : res.status(404).json({ message: "Profile not found" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
const getSpecificUserByUserName = async (req, res) => {
  try {
    let user = await User.findOne({
      userName: req.params.userName.toLowerCase()
    }).select("-password -isEmailVerified -phoneNumber");
    user
      ? res.status(200).json({ user })
      : res.status(404).json({ message: "No User with that user name" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
const getMatches = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user._id);
    const userPreferences = userDetails.preferences;
    const allUsers = await User.find();
    const matches = [];
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i]._id == req.user._id) {
        continue;
      }
      let rating;
      allUsers[i].preferences.map((preference) => {
        if (userPreferences.includes(preference)) {
          rating++;
        }
      });
      const matchWithRating = allUsers[i] + { rating };
      matches.push(matchWithRating);
    }
    res.status(200).json({ matches });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ allUsers });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
module.exports = {
  getUser,
  editUser,
  getSpecificUser,
  getSpecificUserByUserName,
  getMatches,
  getUsers
};
