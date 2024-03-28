const express = require("express");
const { registerAUser, logInUser } = require("../controllers/auth.controller");
const authRouter = express();

authRouter.post("/login", logInUser);
authRouter.post("/register", registerAUser);

module.exports = authRouter;
