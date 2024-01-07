const express = require("express");
const router = express();

router.get("/");
router.post("/sendMessage");
router.post("/loadMessage");
router.get("/conversations");
router.post("/uploadPhoto");
router.post("/uploadVideo");

module.exports = router;
