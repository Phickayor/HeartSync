const profileModel = require("../models/profile.model");

const createProfile = async (req, res) => {
  try {
    var findProfile = await profileModel.findOne({ auth: req.body.auth._id });
    var createProfile = await profileModel.create({
      ...req.body
    });
    if (!findProfile) {
      if (createProfile) {
        res
          .status(200)
          .json({ message: "Profile Created Successfully", success: true });
      } else {
        res.status(501).json({
          message: "An error occured,please try again",
          success: false
        });
      }
    } else {
      res
        .status(403)
        .json({ message: "Profile Already exists", success: false });
    }
  } catch (error) {
    res.status(501).json({
      message: error.message,
      success: false
    });
  }
};

const editProfile = async (req, res) => {
  try {
    console.log(req.body);
    var findProfile = await profileModel.findOne({
      auth: req.body.auth._doc._id
    });
    if (findProfile) {
      var updateProfile = await profileModel.findByIdAndUpdate(
        findProfile._id,
        req.body
      );
      updateProfile
        ? res
            .status(200)
            .json({ success: true, message: "Profile updated successfully" })
        : res.status(501).json({
            success: false,
            message: "An error occured while updating profile "
          });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Profile not Found", data: req.body });
    }
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
  res.end();
};

const getProfile = async (req, res) => {
  try {
    var profile = await profileModel.findOne({ auth: req.body.auth._doc._id });
    profile
      ? res.status(200).json({ success: true, profile })
      : res.status(404).json({ success: false, message: "No profile found" });
  } catch (error) {
    res.status(501).json({ success: false, error: error.message });
  }
};
const getAProfile = async (req, res) => {
  try {
    var profile = await profileModel.findOne({ userName: req.params.username });
    res.status(200).json({ profile });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

module.exports = {
  createProfile,
  editProfile,
  getProfile,
  getAProfile
};
