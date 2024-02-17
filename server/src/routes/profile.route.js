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
const pictureModel = require("../models/pictures.model");
const router = express();

router.get("/", checkAuth, getProfile);
router.get("/:username", getAProfile);
router.post("/create", checkAuth, createProfile);
router.patch("/edit", checkAuth, editProfile);


router.post("/reportUser");
router.get("/blockUser");

module.exports = router;
