
const User = require("../models/user.model");
const { handleEncryption } = require("../utilities/encrypt");

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
module.exports = {
  getUser,
  editUser,
  getSpecificUser,
  getSpecificUserByUserName,
  getMatches
};
