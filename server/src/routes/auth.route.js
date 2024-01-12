const express = require("express");
const { registerAUser, logInUser, sendVerificationMail } = require("../controllers/auth.controller");
const router = express();

router.post("/login", logInUser);
router.post("/register", registerAUser);
router.get("/forgotpassword:email");
router.get("/send-verification-mail", sendVerificationMail);

module.exports = router;
