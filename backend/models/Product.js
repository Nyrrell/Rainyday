import mongoose from "mongoose";

const { model, Schema, Types } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    style: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    quantity: { type: String }
  },
  { timestamps: true }
);

export default model("Product", ProductSchema)