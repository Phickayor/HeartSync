const express = require("express");
const {
  registerAUser,
  logInUser,
  CheckExistingUser
} = require("../controllers/auth.controller");
const authRouter = express();

authRouter.post("/login", logInUser);
authRouter.post("/register", registerAUser);
authRouter.get("/search-users/:email", CheckExistingUser);
module.exports = authRouter;
