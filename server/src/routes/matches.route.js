const express = require("express");
const userMatches = require("../controllers/matches.controller");
const { checkAuth } = require("../controllers/auth.controller");
const matchRouter = express();

matchRouter.get("/", checkAuth, userMatches);
// router.post("/interestedInMatch");
// router.post("/disinterestedInMatch");
// router.get("/mutualMatch");

module.exports = matchRouter;
