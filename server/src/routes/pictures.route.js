const express = require("express");
const { checkAuth } = require("../controllers/auth.controller");
const {
  GetPictures,
  GetAPicture,
  UploadPictures,
  UpdateSinglePicture
} = require("../controllers/pictures.controller");
const upload = require("../config/storage.config");
const router = express();

router.get("/:id/:pictureNumber", checkAuth, GetAPicture);
router.get("/:id", checkAuth, GetPictures);
router.put(
  "/:id/:pictureNumber",
  checkAuth,
  upload.single("picture"),
  UpdateSinglePicture
);

router.post("/upload", upload.array("pictures"), UploadPictures);
module.exports = router;
