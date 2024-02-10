const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify where to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name for uploaded file
  }
});

const upload = multer({ storage: storage });

module.exports = upload;