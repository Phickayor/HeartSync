const express = require("express");
const router = express();

router.get("/");
router.post("/createPreference");
router.patch("/editPreference");

module.exports = router;
