const express = require("express");
const { checkAuth } = require("../controllers/auth.controller");
const router = express();

router.get("/");
router.post("/create");
router.patch("/edit",checkAuth);

module.exports = router;
