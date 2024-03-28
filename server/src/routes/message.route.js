const express = require("express");
const { checkAuth } = require("../controllers/auth.controller");
const {
  sendMessage,
  allMessages
} = require("../controllers/messages.controller");
const router = express();

router.get("/:chatId", checkAuth, allMessages);
router.post("/", checkAuth, sendMessage);

module.exports = router;
