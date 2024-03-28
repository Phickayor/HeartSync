const express = require("express");
const {
  createProfile,
  editProfile,
  getProfile,
  getAProfile,
  deleteAccount
} = require("../controllers/user.controller");
const { checkAuth } = require("../controllers/auth.controller");
const router = express();

router.get("/", checkAuth, getProfile);
router.get("/:userNameOrId", getAProfile);
router.post("/create", checkAuth, createProfile);
router.patch("/edit", checkAuth, editProfile);

router.post("/reportUser");
router.get("/blockUser");

module.exports = router;
