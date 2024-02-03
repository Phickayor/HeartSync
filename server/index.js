const express = require("express");
const cors = require("cors");
const app = express();
const auth_route = require("./src/routes/auth.route");
const profile_route = require("./src/routes/profile.route");
const preference_route = require("./src/routes/preference.route");
const matches_route = require("./src/routes/preference.route");
const feedbacks_route = require("./src/routes/preference.route");
const chat_route = require("./src/routes/preference.route");
const connectToDb = require("./src/config/db.config");
const bodyParser = require("body-parser");
connectToDb();

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the backend of BabyBoo");
});

app.use("/auth", auth_route);
app.use("/profile", profile_route);
app.use("/preference", preference_route);
app.use("/matches", matches_route);
app.use("/feedbacks", feedbacks_route);
app.use("/chat", chat_route);

app.listen(8080, () => {
  console.log("Server is running on port 8080 ");
});
