const express = require("express");
const { registerAUser } = require("../controllers/auth.controller");
const router = express();

router.post("/login");
router.post("/register", registerAUser);
router.get("/forgotpassword:email");
router.post("/verify-mail");

module.exports = router;
