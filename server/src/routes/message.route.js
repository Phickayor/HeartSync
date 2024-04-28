const express = require("express");
const { checkAuth } = require("../controllers/auth.controller");
const {
  sendMessage,
  allMessages,
  readMessage
} = require("../controllers/messages.controller");
const messageRouter = express();

messageRouter.get("/:chatId", checkAuth, allMessages);
messageRouter.post("/", checkAuth, sendMessage);
messageRouter.post("/toggle-read/:messageId", checkAuth, readMessage);

module.exports = messageRouter;
