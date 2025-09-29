import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, default: "Women" },
  subCategory: { type: String, default: "Topwear" },
  bestseller: { type: Boolean, default: false },
  sizes: {
    type: [String], // array of strings
    default: ["S", "M", "L", "XL"], // optional default
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
