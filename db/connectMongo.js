const mongoose = require("mongoose");

require("dotenv").config();

let DB_CONNECTION;

if (process.env.NODE_ENV === "test") {
  console.log("In test mode");
  DB_CONNECTION = process.env.LOCALHOST_DB;
} else {
  console.log("In production mode");
  DB_CONNECTION = process.env.MONGODB_CONNECT_URI;
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONNECTION);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Connection failed", error.message);
  }
};

module.exports = connectDB;
