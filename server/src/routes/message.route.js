const express = require("express");
const { checkAuth } = require("../controllers/auth.controller");
const {
  createMessage,
  readMessage,
  getAllMessages,
  getAMessage
} = require("../controllers/messages.controller");
const { createChat } = require("../controllers/chat.controller");
const router = express();

router.get("/all/:chatId", checkAuth, getAllMessages);
router.post("/send", checkAuth, createChat, createMessage);
router.post("/read/:messageId", checkAuth, readMessage);
router.get("/:messageId", checkAuth,getAMessage);
// router.patch("/edit", checkAuth);

module.exports = router;
