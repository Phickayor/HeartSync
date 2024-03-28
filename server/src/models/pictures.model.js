const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  pic1: { type: String, default: "/images/profile-1.png" },
  pic2: { type: String, default: "/images/profile-2.png" },
  pic3: { type: String, default: "/images/profile-3.png" }
});

const pictureModel = mongoose.model("picture", pictureSchema);

module.exports = pictureModel;
