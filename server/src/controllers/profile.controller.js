const { get } = require("../config/transporter.config");
const authModel = require("../models/auth.model");
const profileModel = require("../models/profile.model");

const createProfile = async (req, res) => {
  try {
    var findProfile = await profileModel.findOne({ auth: req.body.auth._id });
    if (!findProfile) {
      var createProfile = await profileModel.create(req.body);
      if (createProfile) {
        res
          .status(200)
          .json({ message: "Profile Created Successfully", success: true });
      }
    } else {
      res
        .status(403)
        .json({ message: "Profile Already exists", success: false });
    }
  } catch (error) {
    res.status(501).json({
      error: error.message,
      success: false
    });
  }
};

const editProfile = async (req, res) => {
  try {
    var findProfiles = await profileModel.findOne({ auth: req.body.auth._id });
    if (findProfiles) {
      var updateProfile = await profileModel.findByIdAndUpdate(
        findProfiles._id,
        req.body
      );
      updateProfile
        ? res.status(200).json({ message: "Profile updated successfully" })
        : res
            .status(501)
            .json({ message: "An error occured while updating profile " });
    }
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    var profile = await profileModel.findOne({ auth: req.body.auth._id });
    profile
      ? res.status(200).json({ success: true, profile })
      : res.status(404).json({ message: "No profile found" });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
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
    res.status(501).json({ error: error.message });
  }
};
module.exports = {
  createProfile,
  editProfile,
  getProfile,
  deleteAccount
};
