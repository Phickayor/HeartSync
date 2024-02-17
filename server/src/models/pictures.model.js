const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  pic1: String,
  pic2: String,
  pic3: String
});

const pictureModel = mongoose.model("picture", pictureSchema);

module.exports = pictureModel;
