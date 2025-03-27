//This file is responsible for establishing a 
// connection to MongoDB using Mongoose.

//mongoose: A MongoDB ODM (Object Data Modeling)
//  library that helps interact with MongoDB 
// easily.

//dotenv: Loads environment variables from a 
// .env file, ensuring credentials 
// (like MONGO_URI) are not hardcoded.
const mongoose = require("mongoose");
require("dotenv").config();

//The function is declared as async to handle 
// the MongoDB connection asynchronously.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

// Event listeners for better debugging
mongoose.connection.on("disconnected", () => console.log("⚠️ MongoDB Disconnected!"));
mongoose.connection.on("error", (err) => console.error("⚠️ MongoDB Error:", err));

module.exports = connectDB;