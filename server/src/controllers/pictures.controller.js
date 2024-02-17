const pictureModel = require("../models/pictures.model");

const GetAPicture = async (req, res) => {
  try {
    let { id, pictureNumber } = req.params;
    const pictureField = `pic${pictureNumber}`;
    const pictures = await pictureModel.findById(id);
    if (!pictures) {
      return res.status(404).send("Picture not found");
    }
    return res.status(200).json({
      success: true,
      picture: pictures[pictureField]
    });
  } catch (error) {
    res.status(501).json({ success: false, message: error.message });
  }
};
const GetPictures = async (req, res) => {
  try {
    let { id } = req.params;
    const pictures = await pictureModel.findById(id);
    if (!pictures) {
      return res.status(404).send("Picture not found");
    }
    return res.status(200).json({
      success: true,
      pictures: pictures
    });
  } catch (error) {
    res.status(501).json({ success: false, message: error.message });
  }
};
const UpdateSinglePicture = async (req, res) => {
  console.log("Got here");
  try {
    const { id, pictureNumber } = req.params;
    const pictureField = `pic${pictureNumber}`;

    // Find the picture in the database by ID
    const picture = await pictureModel.findById(id);
    if (!picture) {
      return res.status(404).send("Picture not found");
    }

    // Update the specific picture field
    picture[pictureField] = req.body.picture;
    await picture.save();

    res.status(200).send("Picture updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
const UploadPictures = async (req, res) => {
  try {
    const { pic1, pic2, pic3 } = req.body;
    // Assuming you're storing file paths in the database
    const newPicture = new pictureModel({
      pic1,
      pic2,
      pic3
    });
    await newPicture.save();
    res
      .status(200)
      .json({ success: true, message: "Pictures Uploaded Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  GetPictures,
  GetAPicture,
  UpdateSinglePicture,
  UploadPictures
};
