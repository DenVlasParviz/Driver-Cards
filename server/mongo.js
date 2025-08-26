
const { MongoClient } = require("mongodb");

const MONGO_URI     = process.env.MONGO_URI     || "mongodb://localhost:27017";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "drivers_mongo";

const client = new MongoClient(MONGO_URI, {});

async function connectMongo() {
  await client.connect();
  console.log("✅ Connected to MongoDB:", MONGO_DB_NAME);
  return client.db(MONGO_DB_NAME);
}

module.exports = connectMongo();
