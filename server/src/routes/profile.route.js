const express = require("express");
const {
  createProfile,
  editProfile,
  getProfile,
  getAProfile,
  deleteAccount
} = require("../controllers/profile.controller");
const { checkAuth } = require("../controllers/auth.controller");
const upload = require("../config/storage.config");
const router = express();

router.get("/", checkAuth, getProfile);
router.get("/:username", getAProfile);
router.post("/create", checkAuth, createProfile);
router.patch("/edit", checkAuth, upload.array("pictures"), editProfile);
// router.post("/images-upload", upload.array("pictures"));
router.post("/reportUser");
router.get("/blockUser");

module.exports = router;
