const express = require("express");
const { checkAuth } = require("../controllers/auth.controller");
const {
  sendMessage,
  allMessages
} = require("../controllers/messages.controller");
const messageRouter = express();

messageRouter.get("/:chatId", checkAuth, allMessages);
messageRouter.post("/", checkAuth, sendMessage);

module.exports = messageRouter;
