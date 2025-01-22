require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const connection = mongoose
  .createConnection(process.env.MONGO_URI)
  .on("open", () => {
    console.log("MongoDB Connected");
  })
  .on("error", (err) => {
    console.log("MongoDB Connection error:", err);
  });

module.exports = connection;
