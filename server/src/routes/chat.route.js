const express = require("express");
const { checkAuth } = require("../controllers/auth.controller");
const { getChats, getUnreadChats, getAChat } = require("../controllers/chat.controller");
const router = express();

router.get("/all/:userId", checkAuth, getChats);
router.get("/:chatId", checkAuth, getAChat);
router.get("/get-unread-chats/:chatId", checkAuth, getUnreadChats);

module.exports = router;
