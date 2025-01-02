const express = require("express");
const { checkAuth } = require("../controllers/auth.controller");
const {
  sendMessage,
  allMessages,
  readAllMessagesInChat
} = require("../controllers/messages.controller");
const messageRouter = express();

messageRouter.get("/:chatId", checkAuth, allMessages);
messageRouter.post("/", checkAuth, sendMessage);
messageRouter.post("/toggle-read/:chatId", checkAuth, readAllMessagesInChat);

module.exports = messageRouter;
