const express = require("express");
const {
  registerAUser,
  logInUser,
  CheckExistingUser,
  forgotPassword
} = require("../controllers/auth.controller");
const authRouter = express();

authRouter.post("/login", logInUser);
authRouter.post("/register", registerAUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.get("/search-users/:email", CheckExistingUser);
module.exports = authRouter;
