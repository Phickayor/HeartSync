const express = require("express");
const router = express();

router.get("/");
router.post("/reportUser");
router.get("/blockUser");
router.delete("/deleteUser");

module.exports = router;
