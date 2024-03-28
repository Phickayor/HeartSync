const express = require("express");
const { checkAuth } = require("../controllers/auth.controller");
const { fetchChats, accessChat } = require("../controllers/chat.controller");
const router = express();

router.get("/", checkAuth, fetchChats);
router.post("/", checkAuth, accessChat);
module.exports = router;
