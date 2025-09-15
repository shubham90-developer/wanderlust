require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");

const dbatlas = process.env.DBATLAS;

async function updateAllListings() {
  await mongoose.connect(dbatlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get the new user ID that you want to assign
  const newOwner = await User.findOne({ email: "shubham@gmail.com" });
  if (!newOwner) {
    console.log("New owner user not found");
    process.exit();
  }

  // Update all listings
  const result = await Listing.updateMany({}, { owner: newOwner._id });
  console.log("Updated listings:", result.modifiedCount);

  mongoose.connection.close();
}

updateAllListings();
