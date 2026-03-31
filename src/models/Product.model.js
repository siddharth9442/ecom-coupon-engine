import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  images: [{
    url: { type: String, required: true },
    order: { type: Number, required: true }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);