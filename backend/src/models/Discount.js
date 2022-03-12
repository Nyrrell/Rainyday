import mongoose from "mongoose";

const { model, Schema } = mongoose;

const DiscountSchema = new Schema(
  {
    title: { type: String, require: true },
    desc: { type: String },
    percentage: { type: Number, require: true },
    active: { type: Boolean, default: true },
    announce: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default model("Discount", DiscountSchema)