// const pictureModel = require("../models/pictures.model");
const User = require("../models/user.model");

const editUser = async (req, res) => {
  try {
    var findUser = await User.findById(req.user._id);
    if (findUser) {
      var updateUser = await User.findByIdAndUpdate(req.user._id, req.body);
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
    var profile = await User.findById(req.params.userId).select(
      "-password -isEmailVerified -phoneNumber"
    );
    profile
      ? res.status(200).json({ profile })
      : res.status(404).json({ message: "Profile not found" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
module.exports = {
  getUser,
  editUser,
  getSpecificUser
};
