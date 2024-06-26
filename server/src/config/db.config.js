const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  try {
    let db = await mongoose.connect(
      `mongodb+srv://webcraft:${process.env.DB_PSWD}@cluster0.i4m6fkx.mongodb.net/db`
    );
    console.log("Connected to db successfully at " + db.connection.host);
  } catch (error) {
    console.log("Error connecting to db " + error.message);
  }
};

module.exports = connectToDb;
