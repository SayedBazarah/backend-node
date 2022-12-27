//Database Connection Setup
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    images: [String],
    category: { type: String, enum: ["men", "women", "kids"], required: true },
    stock: { type: Number, required: true },
    description: String,
    reviews: [{ rate: Number, comment: String }],
    "meta-title": String,
    "meta-description": String,
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
