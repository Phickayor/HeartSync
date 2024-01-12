const profileModel = require("../models/profile.model");

const createProfile = async (req, res) => {
  try {
    var findUser = await profileModel.findOne({ _id: req.body.auth._id });
    if (!findUser) {
      var createUser = await profileModel.create(req.body);
      if (createUser) {
        res
          .status(200)
          .json({ message: "Profile Created Successfully", success: true });
      }
    } else {
      res.status(403).json({ message: "Profile Already exists", success: false });
    }
  } catch (error) {
    res.status(501).json({
      error: error.message,
      success: false
    });
  }
};
module.exports = {
  createProfile
};
