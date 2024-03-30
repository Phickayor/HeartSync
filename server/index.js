const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./src/routes/auth.route");
const connectToDb = require("./src/config/db.config");
const userRouter = require("./src/routes/user.route");
const app = express();
connectToDb();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.listen(8081, () => {
  console.log("Server is listening");
});
