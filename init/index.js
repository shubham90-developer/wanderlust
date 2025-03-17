const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initDb = require("./data.js");
const { db } = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'

main().then((res)=>{
    console.log("connection sucessful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);

}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initDb.data = initDb.data.map((obj)=>({...obj ,owner:"67b5d8374e68e6956a4d20ca"}))
    await Listing.insertMany(initDb.data);
    console.log("data was printed");
}

initDB();

