const express = require("express");
const router = express();

router.get("/");
router.post("/interestedInMatch");
router.post("/disinterestedInMatch");
router.get("/mutualMatch");

module.exports = router;
