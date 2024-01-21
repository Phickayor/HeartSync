const express = require("express");
const { registerAUser, logInUser, sendVerificationMail, checkAuth, deleteAccount } = require("../controllers/auth.controller");
const router = express();

router.post("/login", logInUser);
router.post("/register", registerAUser);
router.get("/forgotpassword:email");
router.get("/send-verification-mail", sendVerificationMail);
router.delete("/delete",checkAuth,deleteAccount)
module.exports = router;
