const express = require("express");
const { createProfile } = require("../controllers/profile.controller");
const { checkAuth } = require("../controllers/auth.controller");
const router = express();

router.get("/");
router.post("/create", checkAuth, createProfile);
router.patch("/editUser");
router.post("/reportUser");
router.get("/blockUser");
router.delete("/deleteUser");

module.exports = router;
