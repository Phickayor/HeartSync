const express = require("express");
const router = express();

router.get("/");
router.post("/createProfile");
router.patch("/editProfile");

module.exports = router;
