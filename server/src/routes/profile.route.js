const express = require("express");
const {
  createProfile,
  editProfile,
  getProfile,
  deleteAccount
} = require("../controllers/profile.controller");
const { checkAuth } = require("../controllers/auth.controller");
const router = express();

router.get("/", checkAuth, getProfile);
router.post("/create", checkAuth, createProfile);
router.patch("/edit", checkAuth, editProfile);
router.post("/reportUser");
router.get("/blockUser");
router.delete("/delete", checkAuth, deleteAccount);

module.exports = router;
