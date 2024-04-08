const express = require("express");
const { checkAuth } = require("../controllers/auth.controller");
const { accessChat, fetchChats } = require("../controllers/chat.controller");
const chatRouter = express();

chatRouter.get("/", checkAuth, fetchChats);
chatRouter.get("/:userId", checkAuth, accessChat);
module.exports = chatRouter;
