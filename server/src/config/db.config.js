const mongoose = require("mongoose");
require("dotenv").config();
const connectToDb = async () => {
  try {
    var db = await mongoose.connect(
      `mongodb+srv://phickayor:${process.env.DB_PSWD}@cluster0.tnfikyc.mongodb.net/db`
    );
    console.log("Connected to db successfully at " + db.connection.host);
  } catch (error) {
    console.log("Error connecting to db " + error + process.env.DB_PSWD);
  }
};

module.exports = connectToDb;
