import mongoose from "mongoose";

const { model, Schema } = mongoose;

const DiscountSchema = new Schema(
  {
    name: { type: String, require: true },
    percentage: { type: Number, require: true }
  },
  { timestamps: true }
);

export default model("Discount", DiscountSchema)