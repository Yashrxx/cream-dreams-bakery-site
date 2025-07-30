// models/productSchema.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  rating: Number,
  reviews: Number,
  description: String,
  isNew: Boolean,
  isPopular: Boolean,
  imageKey: String, // This matches with Supabase image name
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);