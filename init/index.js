require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initDb = require("./data.js");
require("dotenv").config(); // make sure this is at the very top

// Use local MongoDB as fallback

const dbatlas = process.env.DBATLAS;

console.log("Using DB URL:", dbatlas); // check if it prints correctly

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(dbatlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful");

    // Initialize database after successful connection
    await initDB();

    // Close the connection after finishing
    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
}

// Function to populate DB
async function initDB() {
  try {
    await Listing.deleteMany({});
    const dataWithOwner = initDb.data.map((obj) => ({
      ...obj,
      owner: "67b5d8374e68e6956a4d20ca",
    }));
    await Listing.insertMany(dataWithOwner);
    console.log("Data successfully inserted");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}

// Run everything
main();
