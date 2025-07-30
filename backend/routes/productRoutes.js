import express from "express";
import Product from "../models/ProductSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log(" Incoming GET /api/products request");
    const products = await Product.find();
    console.log(" Fetched products:", products);
    res.json(products);
  } catch (err) {
    console.error(" Error fetching products:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
