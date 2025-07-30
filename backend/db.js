const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env

const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "cakestore", // optional: specify your DB name explicitly
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process on failure
  });
};

module.exports = connectToMongo;