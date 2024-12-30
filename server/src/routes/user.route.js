const express = require("express");
const {
  getUser,
  editUser,
  getSpecificUser,
  getSpecificUserByUserName,
  getUsers
} = require("../controllers/user.controller");
const {
  checkAuth,
  sendVerificationMail
} = require("../controllers/auth.controller");
const userRouter = express();

userRouter.get("/", checkAuth, getUser);
userRouter.get("/verify", checkAuth, sendVerificationMail);
userRouter.get("/all", checkAuth, getUsers);
userRouter.patch("/edit", checkAuth, editUser);
userRouter.get("/:userId", getSpecificUser);
userRouter.get("/username/:userName", getSpecificUserByUserName);
module.exports = userRouter;
