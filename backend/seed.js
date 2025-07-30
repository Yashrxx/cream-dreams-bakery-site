import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // adjust path if needed
import products from "./data/products.js"; // your JSON data

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "cakestore" });

    await Product.deleteMany(); // optional: clears existing data
    await Product.insertMany(products);

    console.log(" Products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(" Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();