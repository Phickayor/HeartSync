const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dse2r9fge",
  secure: true,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET
});

const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "big-circle"
  });
  fs.unlinkSync(filePath);
  if (result.secure_url) {
    return { url: result.secure_url };
  } else {
    return { error: "Cloudinary upload error" };
  }
};
module.exports = { uploadToCloudinary };
