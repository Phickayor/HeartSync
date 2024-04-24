const express = require("express");
const userMatches = require("../controllers/matches.controller");
const { checkAuth } = require("../controllers/auth.controller");
const matchRouter = express();

matchRouter.get("/", checkAuth, userMatches);

module.exports = matchRouter;
