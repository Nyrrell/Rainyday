import mongoose from "mongoose";

const { model, Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: Schema.Types.String, ref: 'Category', required: true },
    size: { type: Array },
    color: { type: Array },
    style: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    quantity: { type: String, require: true },
    discount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default model("Product", ProductSchema)